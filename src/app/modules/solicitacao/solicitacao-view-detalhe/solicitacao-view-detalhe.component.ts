import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import FileSaver from 'file-saver';
import { AppStateService } from 'src/app/app.state';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-solicitacao-view-detalhe',
	templateUrl: './solicitacao-view-detalhe.component.html',
	styleUrls: ['./solicitacao-view-detalhe.component.scss'],
})
export class SolicitacaoViewDetalheComponent {
	userData: any = undefined;
	dataSource: any = {};

	actualFile: any = undefined;

	leftActive: any = undefined;
	middleActive: any = undefined;
	rightActive: any = undefined;

	progressValue = 0;

	id: any;

	constructor(
		public appStateService: AppStateService,
		private readonly activatedRoute: ActivatedRoute,
		private readonly router: Router,
		public dialog: MatDialog,
	) {
		this.activatedRoute.params.subscribe((params) => {
			this.id = params.id;
			this.loadDependencies(params.id);
		});
	}

	loadDependencies(id: any) {
		const request = {
			type: 'GET',
			api: environment.apiUrl,
			path: 'solicitacao/detalhe/' + id,
		};
		this.execute('http-request', request).subscribe((response: any) => {
			this.dataSource = response;
			fetch('data:application/pdf;base64,' + response.comprovante)
				.then(function (resp) {
					return resp.blob();
				})
				.then((blob) => {
					this.actualFile = { file: blob, name: response.comprovanteNome };
				});
			this.loadProgress(response);
		});

		this.appStateService.isUserLoggedIn().subscribe((response: any) => {
			this.userData = response;
		});
	}

	downloadActual() {
		FileSaver.saveAs(this.actualFile.file, this.actualFile.name);
	}

	loadProgress(value: any) {
		console.log(value, 'value');
		value.solicitacaoProgressoList.forEach((element: any) => {
			if (element.idStatus === 1) {
				this.leftActive = element;
				if (element.dataCadastro) {
					this.progressValue = 0;
				}
			}
			if (element.idStatus === 2) {
				this.middleActive = element;
				if (element.dataCadastro) {
					this.progressValue = 50;
				}
			}
			if (element.idStatus === 3) {
				this.rightActive = element;
				if (element.dataCadastro) {
					this.progressValue = 100;
				}
			}
		});
	}

	execute(type: string, data?: any) {
		return this.appStateService.execute({ type: type, data: data });
	}

	statusColor(solicitacao: any) {
		let last = solicitacao.solicitacaoProgressoList[0];
		solicitacao.solicitacaoProgressoList.forEach((element: any) => {
			if (element.dataCadastro) {
				last = element;
			}
		});
		switch (last.status.id) {
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

	back() {
		this.router.navigate(['/solicitacao']);
	}

	openChat() {
		this.execute('open-bottom-sheet', {
			type: 'chatSheet',
			data: this.dataSource,
		});
	}
}
