import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppStateService } from 'src/app/app.state';
import { InicioModalComponent } from './inicio-modal/inicio-modal.component';

@Component({
	selector: 'app-inicio',
	templateUrl: './inicio.component.html',
	styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
	USER_NAME_SESSION_ATTRIBUTE = 'authenticatedUserName';

	constructor(public appStateService: AppStateService, public dialog: MatDialog) {}

	ngOnInit(): void {}

	execute(type: string, data?: any) {
		return this.appStateService.execute({ type: type, data: data });
	}

	getUserName() {
		return sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE);
	}

	openModal() {
		const dialogRef = this.dialog.open(InicioModalComponent, {
			width: '879px',
			backdropClass: 'blurBackground',
		});

		dialogRef.afterClosed().subscribe((result) => {});
	}
}
