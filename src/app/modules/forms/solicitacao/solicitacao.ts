import { environment } from '../../../../environments/environment';
import { Component, EventEmitter, Output, ViewChild, OnInit } from '@angular/core';
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

  actualFile:any = undefined;

  baremaSelect:any = [];
  USER_EMAIL_SESSION_ATTRIBUTE = 'authenticatedUserEmail';
  @Output()
  initialize = new EventEmitter<any>();
  @Output()
  httpRequest = new EventEmitter<any>();
  @Output()
  cancel = new EventEmitter<any>();
  itenData: any;

  totalLocal:any;
  
  fileData: any;

  addHoras = 0;

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
      path: 'atividade-barema/table'
    },
    totalHorasDependency: {
      type: 'GET',
      api: environment.apiUrl,
      path: 'solicitacao/table/finalizado'
    }
  };

  dependenciesData: any;

  totalHorasCalc() {
    let totalHoras = 0;
    this.dependenciesData.totalHorasDependency.forEach((element:any) => {
      Object.keys(element.perfilGrupo).forEach((key, index) => {
        totalHoras += element.perfilGrupo[key].horasContabilizadas;
      })
      
    });
    return totalHoras;
  }

  changeCh() {
    this.addHoras = this.formControl.value.horas;
  }

  totalLocalCalc(data:any) {
    console.log(data)
    const request = {
      type: 'GET',
      api: environment.apiUrl,
      path: `solicitacao/table/finalizado/${data.value}`};
    this.execute('http-request', request).subscribe((response:any) => {
      this.totalLocal = response;
    })
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
    objFormData.append('comprovante', this.fileData);
    objFormData.append('comprovanteNome', this.fileData.name);
    objFormData.append('email', sessionStorage.getItem(this.USER_EMAIL_SESSION_ATTRIBUTE))
    if(this.formControl.get('id')?.value) {
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

  initFormControl(data?: any) {
    console.log(data, "data");
    this.formControl = this.formBuilder.group({
      id: data? data.id : '',
      titulo: data? data.titulo : '',
      horas: data? data.horas : '',
      idAtividadeBarema : data? data.atividadeBarema.id.toString() : '',
    });
    if(data) {
      this.new = false;
      fetch("data:application/pdf;base64," + data.comprovante)
      .then(function(resp) {return resp.blob()})
      .then((blob) => {
        this.actualFile = {file: blob, name: data.comprovanteNome};
        this.fileData = new File([blob], data.comprovanteNome, {type:"application/pdf"});
      });
    }
    console.log(this.formControl);
  }

  downloadActual() {
    FileSaver.saveAs(this.actualFile.file, this.actualFile.name);
  }

  inputFileChanged(event: any) {
    const file: File = event.target.files[0];
    if (file && (file.type === 'application/pdf')) {
      console.log('inputFileChanged', file);
      this.fileData = file; 
      this.actualFile = {name: file.name}
      file.arrayBuffer().then((arrayBuffer) => {
        let base64 = btoa(
          new Uint8Array(arrayBuffer)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        fetch("data:application/pdf;base64," + base64)
          .then(function(resp) {return resp.blob()})
          .then((blob) => {
            this.actualFile['file'] = blob;
          });
    });
    }
    else {
      this.snackBar.open('Formato de arquivo inválido, por favor utilize PDF', 'Ok', {
        duration: 6000,
        panelClass: ['red-snackbar']
      });
      return;
    }
  }
}
