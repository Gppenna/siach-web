import { environment } from '../../../../environments/environment';
import { Component, EventEmitter, Output, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AppStateService } from 'src/app/app.state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateUtils } from 'src/app/utils/date-utils';

@Component({
	selector: 'divulgacao-atividade',
	templateUrl: 'divulgacao-atividade.html',
})
export class DivulgacaoAtividadeSheet {
	loading = true;
	error: any = undefined;
	actionComplete = false;
	formControl: FormGroup;

	baremaSelect: any = [];

	USER_COURSE_SESSION_ATTRIBUTE = 'authenticatedUserCourse';

	@Output()
	initialize = new EventEmitter<any>();
	@Output()
	httpRequest = new EventEmitter<any>();
	@Output()
	cancel = new EventEmitter<any>();
	itenData: any;

	fileData: any;

	constructor(
		private _bottomSheetRef: MatBottomSheetRef<DivulgacaoAtividadeSheet>,
		private formBuilder: FormBuilder,
		public appStateService: AppStateService,
		private readonly snackBar: MatSnackBar,
	) {}

	dependencies: any = {
		atividadeBarema: {
			type: 'GET',
			api: environment.apiUrl,
			path: 'atividade-barema/table/' + this.appStateService.courseId(),
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

	save() {
		let objFormData = new FormData();
		objFormData.append('titulo', this.formControl.get('titulo')?.value);
		objFormData.append('descricao', this.formControl.get('descricao')?.value);
		objFormData.append('horas', this.formControl.get('horas')?.value);
		objFormData.append('idAtividadeBarema', this.formControl.get('idAtividadeBarema')?.value);
		objFormData.append('periodoInicio', DateUtils.toBRDate(this.formControl.get('periodoInicio')?.value));
		objFormData.append('periodoFim', DateUtils.toBRDate(this.formControl.get('periodoFim')?.value));
		objFormData.append('imagem', this.fileData);

		this.loading = true;
		const request = {
			type: 'POST',
			api: environment.apiUrl,
			path: `atividade-complementar/criar`,
			body: objFormData,
		};
		console.log('save :: ', this.itenData);
		this.httpRequest.emit(request);
	}

	initFormControl(data?: any) {
		this.formControl = this.formBuilder.group({
			periodoInicio: '',
			periodoFim: '',
			titulo: '',
			descricao: '',
			horas: '',
			idAtividadeBarema: '',
			imagem: undefined,
		});
		console.log(this.formControl);
	}

	inputFileChanged(event: any) {
		const file: File = event.target.files[0];
		if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
			this.fileData = file;
			console.log('inputFileChanged', file);
		} else {
			this.snackBar.open('Formato de arquivo inválido, utilize os formatos de imagem JPEG ou PNG', 'Ok', {
				duration: 6000,
				panelClass: ['red-snackbar'],
			});
			return;
		}
	}
}
