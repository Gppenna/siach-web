import { environment } from '../../../../environments/environment';
import { Component, EventEmitter, Output, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AppStateService } from 'src/app/app.state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateUtils } from 'src/app/utils/date-utils';

@Component({
  selector: 'solicitacao',
  templateUrl: 'solicitacao.html',
})
export class SolicitacaoSheet {
  loading = true;
  error: any = undefined;
  actionComplete = false;
  formControl: FormGroup;

  baremaSelect:any = [];

  @Output()
  initialize = new EventEmitter<any>();
  @Output()
  httpRequest = new EventEmitter<any>();
  @Output()
  cancel = new EventEmitter<any>();
  itenData: any;
  
  fileData: any;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<SolicitacaoSheet>,
    private formBuilder: FormBuilder,
    private readonly snackBar: MatSnackBar,
  ) {}

  dependencies: any = {
    atividadeBarema: {
      type: 'GET',
      api: environment.apiUrl,
      path: 'atividade-barema/table'
    }
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
    objFormData.append('horas', this.formControl.get('horas')?.value);
    objFormData.append('idAtividadeBarema', this.formControl.get('idAtividadeBarema')?.value);
    objFormData.append('comprovante', this.fileData);

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
      titulo: data? data.titulo : '',
      horas: data? data.horas : '',
      idAtividadeBarema : data? data.atividadeBarema.id.toString() : '',
    });
    if(data) {
      let blob=new Blob([data.comprovante]);
      console.log(blob, 'teste');
    }
    console.log(this.formControl);
  }

  inputFileChanged(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileData = file;
      console.log('inputFileChanged', file);
    }
    else {
      this.snackBar.open('Arquivo inválido', 'Ok', {
        duration: 6000,
        panelClass: ['red-snackbar']
      });
      return;
    }
  }
}
