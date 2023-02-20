import { Component, OnInit } from '@angular/core';
import { AppStateService } from 'src/app/app.state';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
	selector: 'app-solicitacao',
	templateUrl: './solicitacao.component.html',
	styleUrls: ['./solicitacao.component.scss'],
})
export class SolicitacaoComponent implements OnInit {
	userData: any = undefined;
	dataSource: any = [];

	constructor(public appStateService: AppStateService, private readonly snackBar: MatSnackBar, private readonly router: Router) {}

	ngOnInit(): void {
		this.loadDependencies();
	}

	loadDependencies() {
		this.appStateService.isUserLoggedIn().subscribe((response: any) => {
			this.userData = response;
		});

		this.loadSolicitacoes();
	}

	loadSolicitacoes() {
		const requestSol = {
			type: 'GET',
			api: environment.apiUrl,
			path: 'solicitacao/table/rascunho/' + this.appStateService.userId(),
		};
		this.execute('http-request', requestSol).subscribe((response: any) => {
			this.dataSource = response;
			setTimeout(function () {
				document.querySelector('.bottom').scrollIntoView({
					behavior: 'smooth',
				});
			}, 500);
		});
	}

	ativar() {
		const requestSol = {
			type: 'PUT',
			api: environment.apiUrl,
			path: 'solicitacao/ativar',
			body: this.dataSource.map((element: any) => element.id),
		};
		this.execute('http-request', requestSol).subscribe((response: any) => {
			this.loadSolicitacoes();
			this.snackBar.open('Solicitações enviadas com sucesso!', 'Ok', {
				duration: 6000,
				panelClass: ['green-snackbar'],
			});
			this.router.navigate(['/solicitacao']);
		});
	}

	execute(type: string, data?: any) {
		return this.appStateService.execute({ type: type, data: data });
	}

	novaDivulgacaoAtividade() {
		this.execute('open-bottom-sheet', {
			type: 'solicitacaoSheet',
			backSearch: {
				func: () => this.loadSolicitacoes(),
				parameter: {},
			},
		});
	}

	editSolicitacao(solicitacao: any) {
		this.execute('open-bottom-sheet', {
			type: 'solicitacaoSheet',
			data: solicitacao,
			backSearch: {
				func: () => this.loadSolicitacoes(),
				parameter: {},
			},
		});
	}
}
