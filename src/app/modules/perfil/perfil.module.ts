import { SharedModule } from './../../shared/shared.module';
import { PerfilComponent } from './perfil.component';

import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BarraProgressoComponent } from '../barra-progresso/barra-progresso.component';
import { BarraProgressoModalComponent } from './barra-progresso-modal/barra-progresso-modal.component';

const routes: Routes = [
  {
    path: '',
    component: PerfilComponent,
  },
];

@NgModule({
  declarations: [PerfilComponent, BarraProgressoModalComponent],
  imports: [
    RouterModule.forChild(routes),
    MatDividerModule,
    CommonModule,
    MatDialogModule,
    MatIconModule,
    SharedModule,
  ],
  providers: [MatDatepickerModule],
  entryComponents: [PerfilComponent],
})
export class PerfilModule {}
