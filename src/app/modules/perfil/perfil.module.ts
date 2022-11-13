import { PerfilComponent } from './perfil.component';

import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';


const routes: Routes = [
  {
    path: '',
    component: PerfilComponent,
  },
];

@NgModule({
  declarations: [PerfilComponent],
  imports: [
    RouterModule.forChild(routes),
    MatDividerModule,
    CommonModule,
    MatDialogModule,
    MatIconModule
  ],
  providers: [MatDatepickerModule],
  entryComponents: [PerfilComponent],
})
export class PerfilModule {}
