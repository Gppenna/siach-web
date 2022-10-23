import { environment } from './../../../../environments/environment';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AppStateService } from 'src/app/app.state';

@Component({
  selector: 'grupo',
  templateUrl: 'grupo.html',
})
export class GrupoSheet {
  loading = true;
  error: any = undefined;
  actionComplete = false;
  formControl: FormGroup;

  USER_COURSE_SESSION_ATTRIBUTE = 'authenticatedUserCourse';

  @Output()
  initialize = new EventEmitter<any>();
  @Output()
  httpRequest = new EventEmitter<any>();
  @Output()
  cancel = new EventEmitter<any>();
  itenData: any;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<GrupoSheet>,
    private formBuilder: FormBuilder
  ) {}

  onConnectedToParent() {
    this.initialize.emit();
  }

  onCancel(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this._bottomSheetRef.dismiss();
    this.cancel.emit();
  }

  save(value:any) {
    this.loading = true;
    const request = {
      type: 'POST',
      api: environment.apiUrl,
      path: `barema/criar`,
      body: value,
    };
    console.log('save :: ', this.itenData);
    this.httpRequest.emit(request);
  }

  initFormControl(data?: any) {
    this.formControl = this.formBuilder.group({
      descricao: '',
      minimoHoras: '',
      numero: '',
      idCurso : sessionStorage.getItem(this.USER_COURSE_SESSION_ATTRIBUTE)
    });
    console.log(this.formControl);
  }
}
