import { environment } from '../../../../environments/environment';
import { Component, EventEmitter, Output, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AppStateService } from 'src/app/app.state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateUtils } from 'src/app/utils/date-utils';
import FileSaver, { saveAs } from 'file-saver';

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
	) {}

	dependencies: any = {
		atividadeBarema: {
			type: 'GET',
			api: environment.apiUrl,
			path: 'atividade-barema/table',
		},
		totalHorasDependency: {
			type: 'GET',
			api: environment.apiUrl,
			path: 'perfil',
		},
	};

	dependenciesData: any;

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
			console.log(this.totalHoras, this.totalHorasRascunho, 'horas');
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
			console.log(this.addHoras, 'addhoras');
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
		console.log(this.getHorasContabilizadas(), this.getHoraLimite(), 'horasRestantesLimite');
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
		if (this.formControl.get('id')?.value) {
			objFormData.append('id', this.formControl.get('id')?.value);
		}

		this.loading = true;
		const request = {
			type: 'POST',
			api: environment.apiUrl,
			path: `solicitacao/criar`,
			body: objFormData,
		};
		console.log('save :: ', objFormData);
		this.httpRequest.emit(request);
	}

	downloadActual() {
		FileSaver.saveAs(this.actualFile.file, this.actualFile.name);
	}

	inputFileChanged(event: any) {
		const file: File = event.target.files[0];
		if (file && file.type === 'application/pdf') {
			console.log('inputFileChanged', file);
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
		console.log(data, 'data');
		this.formControl = this.formBuilder.group({
			id: data ? data.id : '',
			titulo: data ? data.titulo : '',
			horas: data ? data.horas : '',
			coringaFlag: data ? (data.statusInterno === 'E' ? true : false) : false,
			idAtividadeBarema: data ? data.atividadeBarema.id.toString() : '',
		});
		if (data) {
			this.totalLocalCalc(data.atividadeBarema.id);
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
}
