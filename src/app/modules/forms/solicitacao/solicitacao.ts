import { environment } from '../../../../environments/environment';
import { Component, EventEmitter, Output, ViewChild, OnInit, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AppStateService } from 'src/app/app.state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateUtils } from 'src/app/utils/date-utils';
import FileSaver, { saveAs } from 'file-saver';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';

@Component({
	selector: 'solicitacao',
	templateUrl: 'solicitacao.html',
})
export class SolicitacaoSheet {
	loading = true;
	error: any = undefined;
	actionComplete = false;
	formControl: FormGroup;
	new = true;

	stopFlag = false;
	stopFlagExceed = false;
	actualFile: any = undefined;

	baremaSelect: any = [];
	USER_EMAIL_SESSION_ATTRIBUTE = 'authenticatedUserEmail';
	@Output()
	initialize = new EventEmitter<any>();
	@Output()
	httpRequest = new EventEmitter<any>();
	@Output()
	cancel = new EventEmitter<any>();
	itenData: any;

	totalLocal: any;

	fileData: any;

	subHorasRascunho = 0;

	addHoras = 0;
	addHorasFlag = false;

	totalHoras = 0;
	totalHorasRascunho = 0;
	exectotalHorasCalc = true;

	constructor(
		private _bottomSheetRef: MatBottomSheetRef<SolicitacaoSheet>,
		private formBuilder: FormBuilder,
		public appStateService: AppStateService,
		private readonly snackBar: MatSnackBar,
		private cdr: ChangeDetectorRef,
	) {}

	@ViewChild('form', { static: false }) form: ElementRef;
	@ViewChild('hour', { static: false }) hour: ElementRef;

	skipToForm(): void {
		this.form.nativeElement.focus();
		this.cdr.detectChanges();
	}

	skipToHour(): void {
		this.hour.nativeElement.focus();
		this.cdr.detectChanges();
	}

	dependencies: any = {
		totalHorasDependency: {
			type: 'GET',
			api: environment.apiUrl,
			path: 'perfil/user/' + this.appStateService.userId(),
		},
	};

	dependenciesData: any;

	filteredOptions: Observable<any>;

	atividadeBaremaList: any;

	autoCompleteSelect(event: any) {
		this.formControl.patchValue({ idAtividadeBarema: event.value.idAtividadeBarema, atividadeBarema: event.value.descricao });
		this.formControl.updateValueAndValidity();
	}

	colorsCalc(numerador: any, denominador: any, normalize?: any) {
		let arit = (100 * numerador) / denominador;
		if (normalize) {
			arit += normalize;
		}
		return 'calc(' + arit + '%)';
	}

	conicGradientFactory(initialColor: any, finalColor: any, numerador: any, denominador: any) {
		let gradientString = 'conic-gradient(';
		let firstColorString = initialColor + ' ' + this.colorsCalc(numerador, denominador) + ',';
		let finalColorString = finalColor + ' ' + this.colorsCalc(numerador, denominador, 0.3) + ')';
		gradientString += firstColorString + finalColorString;

		return gradientString;
	}

	totalHorasCalc() {
		if (this.exectotalHorasCalc) {
			this.dependenciesData.totalHorasDependency.forEach((element: any) => {
				Object.keys(element.perfilGrupo).forEach((key, index) => {
					this.totalHoras += element.perfilGrupo[key].horasContabilizadas;

					this.totalHorasRascunho += element.perfilGrupo[key].horasContabilizadasRascunho;
				});
				if (this.totalHorasRascunho > 0) {
					this.addHorasFlag = true;
				}
			});

			this.exectotalHorasCalc = false;
		}
	}

	getHorasContabilizadas() {
		let horasContabilizadas = 0;
		let atividade = this.totalLocal[0].perfilAtividadeList[this.formControl.value.idAtividadeBarema];
		horasContabilizadas += atividade.horasContabilizadas + atividade.horasContabilizadasRascunho;

		return horasContabilizadas;
	}

	getHoraLimite() {
		let atividadeFinalizado = this.totalLocal[0].perfilAtividadeList[this.formControl.value.idAtividadeBarema];
		return atividadeFinalizado.horasLimite;
	}

	changeCh() {
		if (this.getHorasContabilizadas() + this.formControl.value.horas - this.subHorasRascunho <= this.getHoraLimite()) {
			this.addHoras = this.formControl.value.horas;
		} else {
			this.addHoras = this.getHoraLimite() - this.getHorasContabilizadas() + this.subHorasRascunho;
		}
	}

	horasRestantes() {
		if (this.formControl.value.coringaFlag) {
			return this.getHoraLimite();
		}
		if (this.totalLocal) {
			let horasRestantes = 0;
			let atividade = this.totalLocal[0].perfilAtividadeList[this.formControl.value.idAtividadeBarema];
			horasRestantes += atividade.horasContabilizadas + atividade.horasContabilizadasRascunho;

			return atividade.horasLimite - horasRestantes + this.subHorasRascunho;
		}
		return 0;
	}

	totalLocalCalc(data: any) {
		console.log(data, 'totalLocalCalc');
		const request = {
			type: 'GET',
			api: environment.apiUrl,
			path: `perfil/${data}`,
		};
		this.execute('http-request', request).subscribe((response: any) => {
			this.totalLocal = response;
			this.stopFlag = false;
			this.addHoras = 0;
			this.checkLimiteHoras();
			this.changeCh();
		});
	}

	checkLimiteHoras() {
		if (this.getHorasContabilizadas() === this.getHoraLimite() && this.new) {
			this.stopFlag = true;
			this.snackBar.open('Você já aproveitou todas as horas possíveis a esta atividade!', 'Ok', {
				duration: 6000,
				panelClass: ['red-snackbar'],
			});
		}
	}

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
		objFormData.append('titulo', this.formControl.get('titulo')?.value);
		objFormData.append('horas', this.formControl.get('horas')?.value);
		objFormData.append('idAtividadeBarema', this.formControl.get('idAtividadeBarema')?.value);
		if (this.formControl.get('coringaFlag')?.value) {
			objFormData.append('statusInterno', 'E');
		}
		objFormData.append('comprovante', this.fileData);
		objFormData.append('comprovanteNome', this.fileData.name);
		objFormData.append('email', sessionStorage.getItem(this.USER_EMAIL_SESSION_ATTRIBUTE));
		if (this.formControl.get('idSolicitacao')?.value) {
			objFormData.append('idSolicitacao', this.formControl.get('idSolicitacao')?.value);
		}

		this.loading = true;
		const request = {
			type: 'POST',
			api: environment.apiUrl,
			path: `solicitacao/criar`,
			body: objFormData,
		};
		this.httpRequest.emit(request);
	}

	downloadActual() {
		FileSaver.saveAs(this.actualFile.file, this.actualFile.name);
	}

	inputFileChanged(event: any) {
		const file: File = event.target.files[0];
		if (file && file.type === 'application/pdf') {
			this.fileData = file;
			this.actualFile = { name: file.name };
			file.arrayBuffer().then((arrayBuffer) => {
				let base64 = btoa(new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), ''));
				fetch('data:application/pdf;base64,' + base64)
					.then(function (resp) {
						return resp.blob();
					})
					.then((blob) => {
						this.actualFile['file'] = blob;
					});
			});
		} else {
			this.snackBar.open('Formato de arquivo inválido, por favor utilize PDF', 'Ok', {
				duration: 6000,
				panelClass: ['red-snackbar'],
			});
			return;
		}
	}

	initFormControl(data?: any) {
		this.loadDependencies();

		this.formControl = this.formBuilder.group({
			idSolicitacao: data ? data.idSolicitacao : '',
			titulo: data ? data.titulo : '',
			horas: data ? data.horas : '',
			coringaFlag: data ? (data.statusInterno === 'E' ? true : false) : false,
			idAtividadeBarema: data ? data.atividadeBarema.idAtividadeBarema.toString() : '',
			atividadeBarema: '',
		});

		if (data) {
			this.totalLocalCalc(data.atividadeBarema.idAtividadeBarema);
			console.log('initFormControl', data);
			if (data.statusInterno !== 'E') {
				this.subHorasRascunho = data.horas;
			} else {
				this.stopFlagExceed = true;
			}
			this.new = false;
			fetch('data:application/pdf;base64,' + data.comprovante)
				.then(function (resp) {
					return resp.blob();
				})
				.then((blob) => {
					this.actualFile = { file: blob, name: data.comprovanteNome };
					this.fileData = new File([blob], data.comprovanteNome, { type: 'application/pdf' });
				});
		}
	}

	loadDependencies() {
		const request = {
			type: 'GET',
			api: environment.apiUrl,
			path: 'atividade-barema/table/' + this.appStateService.courseId(),
		};
		this.execute('http-request', request).subscribe((result) => {
			this.atividadeBaremaList = result;
			if (this.formControl.value.idAtividadeBarema) {
				this.formControl.patchValue({
					atividadeBarema: this.atividadeBaremaList.find(
						(atividade: any) => Number(atividade.idAtividadeBarema) === Number(this.formControl.value.idAtividadeBarema),
					).descricao,
				});
			}
			this.filteredOptions = this.formControl.get('atividadeBarema').valueChanges.pipe(
				startWith(''),
				map((value) => this._filter(value || '')),
			);
		});
	}

	private _filter(value: string): string[] {
		if (typeof value !== 'object') {
			const filterValue = value.toLowerCase();

			return this.atividadeBaremaList.filter((option: any) => option.descricao.toLowerCase().includes(filterValue));
		}
		return this.atividadeBaremaList;
	}
}
