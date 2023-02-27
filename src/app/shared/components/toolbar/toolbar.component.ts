// src\app\shared\components\toolbar\toolbar.component.ts

import { Component, OnInit, Input } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AppStateService } from 'src/app/app.state';

@Component({
	selector: 'app-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
	constructor(public appStateService: AppStateService) {}

	ngOnInit(): void {}

	execute(type: string, data?: any) {
		return this.appStateService.execute({ type: type, data: data });
	}

	closeAll(item: any) {
		this.appStateService.state.menu.forEach((element: any) => {
			if (element !== item) {
				element.expanded = false;
			}
		});
	}
}
