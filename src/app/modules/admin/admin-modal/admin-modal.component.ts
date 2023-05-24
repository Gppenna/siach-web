import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppStateService } from 'src/app/app.state';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-admin-modal',
	templateUrl: './admin-modal.component.html',
	styleUrls: ['./admin-modal.component.scss'],
})
export class AdminModalComponent implements OnInit {
	constructor(public appStateService: AppStateService, @Inject(MAT_DIALOG_DATA) public data: any) {}

	dataSource: any;

	ngOnInit(): void {
		this.dataSource = this.data.dataSource;
	}

	execute(type: string, data?: any) {
		return this.appStateService.execute({ type: type, data: data });
	}

	remover() {
		const request = {
			type: 'POST',
			api: environment.apiUrl,
			path: 'atividade-barema/deletar',
		};
		this.execute('http-request', request).subscribe((response: any) => {
			this.dataSource = response;
		});
	}
}
