import { environment } from '../../../../environments/environment';
import { Component, EventEmitter, Output, ViewChild, OnInit, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AppStateService } from 'src/app/app.state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateUtils } from 'src/app/utils/date-utils';
import FileSaver, { saveAs } from 'file-saver';
import { Router } from '@angular/router';

@Component({
	selector: 'chat',
	templateUrl: 'chat.html',
})
export class ChatSheet {
	loading = true;
	error: any = undefined;
	actionComplete = false;
	formControl: FormGroup;
	new = true;

	@Output()
	initialize = new EventEmitter<any>();
	@Output()
	httpRequest = new EventEmitter<any>();
	@Output()
	cancel = new EventEmitter<any>();
	data: any = [];

	constructor(
		private _bottomSheetRef: MatBottomSheetRef<ChatSheet>,
		private formBuilder: FormBuilder,
		public appStateService: AppStateService,
		private cdr: ChangeDetectorRef,
	) {}

	execute(type: string, data?: any) {
		return this.appStateService.execute({ type: type, data: data });
	}

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
		objFormData.append('mensagem', this.formControl.get('mensagem')?.value);
		objFormData.append('idSolicitacao', this.formControl.get('idSolicitacao')?.value);
		objFormData.append('idUsuario', this.formControl.get('idUsuario')?.value);
		this.loading = true;
		const request = {
			type: 'POST',
			api: environment.apiUrl,
			path: `parecer/criar`,
			body: objFormData,
		};
		this.httpRequest.emit(request);
	}

	initFormControl(data?: any) {
		this.formControl = this.formBuilder.group({
			idSolicitacao: data ? data.idSolicitacao : '',
			mensagem: '',
			idUsuario: this.appStateService.userId(),
		});
		this.loadDependencies(data.idSolicitacao);
	}

	@ViewChild('chat', { static: false }) chat: ElementRef;
	@ViewChild('form', { static: false }) form: ElementRef;

	skipToChat(): void {
		this.chat.nativeElement.focus();
		this.cdr.detectChanges();
	}

	skipToForm(): void {
		this.form.nativeElement.focus();
		this.cdr.detectChanges();
	}

	loadDependencies(id: any) {
		const request = {
			type: 'GET',
			api: environment.apiUrl,
			path: 'parecer/table/' + id,
		};
		this.execute('http-request', request).subscribe((response: any) => {
			this.data = response;
		});
	}
}
