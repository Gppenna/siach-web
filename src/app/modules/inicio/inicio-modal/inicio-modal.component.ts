import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import FileSaver from 'file-saver';
import { AppStateService } from 'src/app/app.state';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-inicio-modal',
	templateUrl: './inicio-modal.component.html',
	styleUrls: ['./inicio-modal.component.scss'],
})
export class InicioModalComponent implements OnInit {
	constructor(
		public appStateService: AppStateService,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private readonly dialogRef: MatDialogRef<InicioModalComponent>,
	) {}

	ngOnInit(): void {}

	execute(type: string, data?: any) {
		return this.appStateService.execute({ type: type, data: data });
	}

	close() {
		this.dialogRef.close();
	}

	baixarBarema() {
		fetch('data:application/pdf;base64,' + this.appStateService.state?.userData?.curso.barema)
			.then(function (resp) {
				return resp.blob();
			})
			.then((blob) => {
				let actualFile = { file: blob, name: 'resolucao-barema' };
				FileSaver.saveAs(actualFile.file, actualFile.name);
			});
	}
}
