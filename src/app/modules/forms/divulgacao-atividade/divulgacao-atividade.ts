import { environment } from '../../../../environments/environment';
import { Component, EventEmitter, Output, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AppStateService } from 'src/app/app.state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateUtils } from 'src/app/utils/date-utils';
import { Observable, map, startWith } from 'rxjs';

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

	filteredOptions: Observable<any>;

	constructor(
		private _bottomSheetRef: MatBottomSheetRef<DivulgacaoAtividadeSheet>,
		private formBuilder: FormBuilder,
		public appStateService: AppStateService,
		private readonly snackBar: MatSnackBar,
	) {}

	data: any = {};

	onConnectedToParent() {
		this.initialize.emit();
	}

	onCancel(event: MouseEvent) {
		event.preventDefault();
		event.stopPropagation();
		this._bottomSheetRef.dismiss();
		this.cancel.emit();
	}

	execute(type: string, data?: any) {
		return this.appStateService.execute({ type: type, data: data });
	}

	loadDependencies() {
		const request = {
			type: 'GET',
			api: environment.apiUrl,
			path: 'atividade-barema/table/' + this.appStateService.courseId(),
		};
		this.execute('http-request', request).subscribe((result) => {
			this.data.atividadeBarema = result;
			this.filteredOptions = this.formControl.get('atividadeBarema').valueChanges.pipe(
				startWith(''),
				map((value) => this._filter(value || '')),
			);
		});
	}

	private _filter(value: string): string[] {
		if (typeof value !== 'object') {
			const filterValue = value.toLowerCase();

			return this.data.atividadeBarema.filter((option: any) => option.descricao.toLowerCase().includes(filterValue));
		}
		return this.data.atividadeBarema;
	}

	autoCompleteSelect(event: any) {
		this.formControl.patchValue({ idAtividadeBarema: event.value.idAtividadeBarema, atividadeBarema: event.value.descricao });
		this.formControl.updateValueAndValidity();
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
		this.httpRequest.emit(request);
	}

	initFormControl(data?: any) {
		this.loadDependencies();
		this.formControl = this.formBuilder.group({
			periodoInicio: '',
			periodoFim: '',
			titulo: '',
			descricao: '',
			horas: '',
			idAtividadeBarema: '',
			atividadeBarema: '',
			imagem: undefined,
		});
	}

	inputFileChanged(event: any) {
		const file: File = event.target.files[0];
		if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
			this.fileData = file;
		} else {
			this.snackBar.open('Formato de arquivo inválido, utilize os formatos de imagem JPEG ou PNG', 'Ok', {
				duration: 6000,
				panelClass: ['red-snackbar'],
			});
			return;
		}
	}
}
