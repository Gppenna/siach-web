import { environment } from './../../../../environments/environment';
import { Component, EventEmitter, Output, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AppStateService } from 'src/app/app.state';

@Component({
	selector: 'atividade',
	templateUrl: 'atividade.html',
})
export class AtividadeSheet {
	loading = true;
	error: any = undefined;
	actionComplete = false;
	formControl: FormGroup;

	new = true;

	baremaSelect: any = [];

	USER_COURSE_SESSION_ATTRIBUTE = 'authenticatedUserCourse';

	@Output()
	initialize = new EventEmitter<any>();
	@Output()
	httpRequest = new EventEmitter<any>();
	@Output()
	cancel = new EventEmitter<any>();
	itenData: any;

	constructor(
		private _bottomSheetRef: MatBottomSheetRef<AtividadeSheet>,
		private formBuilder: FormBuilder,
		public appStateService: AppStateService,
	) {}

	dependencies: any = {
		grupoBarema: {
			type: 'GET',
			api: environment.apiUrl,
			path: 'grupo-barema/table/' + this.appStateService.courseId(),
		},
	};

	dependenciesData: any;

	onConnectedToParent() {
		this.initialize.emit();
	}

	onCancel(event: MouseEvent) {
		event.preventDefault();
		event.stopPropagation();
		this._bottomSheetRef.dismiss();
		this.cancel.emit();
	}

	save(value: any) {
		this.loading = true;
		const request = {
			type: 'POST',
			api: environment.apiUrl,
			path: `atividade-barema/criar`,
			body: value,
		};
		console.log('save :: ', this.itenData);
		this.httpRequest.emit(request);
	}

	initFormControl(data?: any) {
		if (data) {
			this.new = false;
		}
		this.formControl = this.formBuilder.group({
			idAtividadeBarema: data ? data.idAtividadeBarema : '',
			descricao: data ? data.descricao : '',
			minimoHoras: data ? data.minimoHoras : '',
			idGrupoBarema: data ? data.idGrupoBarema.toString() : '',
		});
	}
}
