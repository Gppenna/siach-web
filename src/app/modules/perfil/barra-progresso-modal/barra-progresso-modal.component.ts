import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppStateService } from 'src/app/app.state';

@Component({
	selector: 'app-barra-progresso-modal',
	templateUrl: './barra-progresso-modal.component.html',
	styleUrls: ['./barra-progresso-modal.component.scss'],
})
export class BarraProgressoModalComponent implements OnInit {
	constructor(
		public appStateService: AppStateService,
		public dialogRef: MatDialogRef<BarraProgressoModalComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
	) {}

	dataSource: any;
	header: any;

	ngOnInit(): void {
		Object.keys(this.data.header).forEach((grupo: any) => {
			this.header = this.data.header[grupo].descricao;
		});
		this.dataSource = this.data.dataSource;
	}

	execute(type: string, data?: any) {
		return this.appStateService.execute({ type: type, data: data });
	}

	close() {
		this.dialogRef.close();
	}
}
