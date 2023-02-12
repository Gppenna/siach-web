import { DateUtils } from 'src/app/utils/date-utils';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppStateService } from 'src/app/app.state';
import { environment } from 'src/environments/environment';
import { AtividadesModalComponent } from './atividades-modal/atividades-modal.component';
import { FiltroUtil } from 'src/app/utils/filtro-util';
import { HttpUtils } from 'src/app/utils/http-utils';

@Component({
	selector: 'app-atividades',
	templateUrl: './atividades.component.html',
	styleUrls: ['./atividades.component.scss'],
})
export class AtividadesComponent implements OnInit {
	filtro = this.newFilter();
	loading = false;

	image: any = undefined;
	dataSource: any;
	constructor(public appStateService: AppStateService, public dialog: MatDialog) {}

	ngOnInit(): void {
		this.loadDependencies();
	}

	private newFilter() {
		return {
			limit: 10,
			page: 0,
			atividadeBaremaId: undefined as any,
			grupoBaremaId: undefined as any,
			cargaHoraria: undefined as any,
		};
	}

	freshFilter() {
		this.dataSource = { itens: [], currentPage: 0, totalItens: 0 };
		this.filtro.page = 0;
		this.filtro.limit = 10;
		this.loadDependencies();
	}

	loadDependencies() {
		this.loading = true;
		const filtro = JSON.parse(JSON.stringify(this.filtro));

		const filter = FiltroUtil.getFiltro(filtro);
		const request = {
			type: 'GET',
			api: environment.apiUrl,
			path: 'atividade-complementar/table' + '?' + HttpUtils.buildHttpParams(filter),
		};
		this.execute('http-request', request).subscribe((response: any) => {
			response.itens.forEach((element: any) => {
				element.imagem = 'data:image/jpg;base64,' + element.imagem;
			});
			this.dataSource = response;
			this.loading = false;
		});
	}

	loadMore() {
		this.filtro.limit += 5;
		this.loadDependencies();
	}

	execute(type: string, data?: any) {
		return this.appStateService.execute({ type: type, data: data });
	}

	openDetails(data: any) {
		const dialogRef = this.dialog.open(AtividadesModalComponent, {
			width: '879px',
			backdropClass: 'blurBackground',
			data: {
				dataSource: data,
			},
		});

		dialogRef.afterClosed().subscribe((result) => {});
	}

	novaDivulgacaoAtividade() {
		this.execute('open-bottom-sheet', {
			type: 'divulgacaoAtividadeSheet',
		});
	}
}
