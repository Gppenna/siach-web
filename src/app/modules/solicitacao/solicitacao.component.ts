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
			path: 'solicitacao/table/' + this.appStateService.userId(),
		};
		this.loading = true;
		this.execute('http-request', requestSol).subscribe((response: any) => {
			this.dataSource = response;
			this.loading = false;
		});
	}

	openDetails(solicitacao: any) {
		this.router.navigate(['/solicitacao/detalhe/' + solicitacao.idSolicitacao]);
	}

	@ViewChild('info', { static: false }) info: ElementRef;
	@ViewChild('aproveitamentos', { static: false }) aproveitamentos: ElementRef;

	@ViewChild('enviar', { static: false }) enviar: ElementRef;
	@ViewChild('rascunhosCards', { static: false }) rascunhosCards: ElementRef;

	skipToInfo(): void {
		this.info.nativeElement.focus();
		this.cdr.detectChanges();
	}

	skipToAproveitamentos(): void {
		this.aproveitamentos.nativeElement.focus();
		this.cdr.detectChanges();
	}

	skipToAproveitamentosCards(): void {
		this.rascunhosCards.nativeElement.focus();
		this.cdr.detectChanges();
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

	statusColor(solicitacao: any) {
		let last = solicitacao.solicitacaoProgressoList[0];
		solicitacao.solicitacaoProgressoList.forEach((element: any) => {
			if (element.dataCadastro) {
				last = element;
			}
		});
		switch (last.status.idStatus) {
			case 1:
				solicitacao.statusNow = last.status.descricao;
				return 'enviado';
			case 2:
				solicitacao.statusNow = last.status.descricao;
				return 'analise';
			case 3:
				solicitacao.statusNow = last.status.descricao;
				return 'finalizado';
			default:
				solicitacao.statusNow = last.status.descricao;
				return 'enviado';
		}
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
