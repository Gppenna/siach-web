import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppStateService } from 'src/app/app.state';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-solicitacao-view',
	templateUrl: './solicitacao-view.component.html',
	styleUrls: ['./solicitacao-view.component.scss'],
})
export class SolicitacaoViewComponent implements OnInit {
	image: any = undefined;
	dataSource: any[] = [];
	dataSourcePendente: any[] = [];
	constructor(public appStateService: AppStateService, private readonly router: Router, public dialog: MatDialog) {}

	ngOnInit(): void {
		this.loadDependencies();
		this.loadSolicitacoes();
	}

	loadSolicitacoes() {
		const requestSol = {
			type: 'GET',
			api: environment.apiUrl,
			path: 'solicitacao/table/rascunho/' + this.appStateService.userId(),
		};
		this.execute('http-request', requestSol).subscribe((response: any) => {
			this.dataSourcePendente = response;
		});
	}

	loadDependencies() {
		const request = {
			type: 'GET',
			api: environment.apiUrl,
			path: 'solicitacao/table/' + this.appStateService.userId(),
		};
		this.execute('http-request', request).subscribe((response: any) => {
			this.dataSource = response;
		});
	}

	execute(type: string, data?: any) {
		return this.appStateService.execute({ type: type, data: data });
	}

	openDetails(solicitacao: any) {
		this.router.navigate(['/solicitacao/detalhe/' + solicitacao.idSolicitacao]);
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
}
