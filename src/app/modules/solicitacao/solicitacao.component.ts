import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
	loading = true;

	constructor(
		public appStateService: AppStateService,
		private cdr: ChangeDetectorRef,
		private readonly snackBar: MatSnackBar,
		private readonly router: Router,
	) {}

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
		this.loading = true;
		this.execute('http-request', requestSol).subscribe((response: any) => {
			this.dataSource = response;
			this.loading = false;
			setTimeout(function () {
				document.querySelector('.bottom').scrollIntoView({
					behavior: 'smooth',
				});
			}, 500);
		});
	}

	@ViewChild('info', { static: false }) info: ElementRef;
	@ViewChild('rascunhos', { static: false }) rascunhos: ElementRef;

	@ViewChild('enviar', { static: false }) enviar: ElementRef;
	@ViewChild('rascunhosCards', { static: false }) rascunhosCards: ElementRef;

	skipToInfo(): void {
		this.info.nativeElement.focus();
		this.cdr.detectChanges();
	}

	skipToRascunhos(): void {
		this.rascunhos.nativeElement.focus();
		this.cdr.detectChanges();
	}

	skipToRascunhosCards(): void {
		this.rascunhosCards.nativeElement.focus();
		this.cdr.detectChanges();
	}

	skipToEnviar(): void {
		this.enviar.nativeElement.focus();
		this.cdr.detectChanges();
	}

	ativar() {
		const requestSol = {
			type: 'PUT',
			api: environment.apiUrl,
			path: 'solicitacao/ativar',
			body: this.dataSource.map((element: any) => element.idSolicitacao),
		};
		this.loading = true;
		this.execute('http-request', requestSol).subscribe((response: any) => {
			this.loadSolicitacoes();
			this.snackBar.open('Solicitação de aproveitamento enviada com sucesso!', 'Ok', {
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
