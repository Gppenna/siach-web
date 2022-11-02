
import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule, Routes } from '@angular/router';
import { SolicitacaoComponent } from './solicitacao.component';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';


const routes: Routes = [
  {
    path: 'criar',
    component: SolicitacaoComponent,
  },
];

@NgModule({
  declarations: [SolicitacaoComponent],
  imports: [
    RouterModule.forChild(routes),
    MatDividerModule,
    CommonModule,
    MatDialogModule,
    MatIconModule
  ],
  providers: [MatDatepickerModule],
  entryComponents: [SolicitacaoComponent],
})
export class SolicitacaoModule {}
