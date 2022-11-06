
import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule, Routes } from '@angular/router';
import { SolicitacaoComponent } from './solicitacao.component';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SolicitacaoViewComponent } from './solicitacao-view/solicitacao-view.component';
import { SolicitacaoViewDetalheComponent } from './solicitacao-view-detalhe/solicitacao-view-detalhe.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';



const routes: Routes = [
  {
    path: '',
    component: SolicitacaoViewComponent,
  },
  {
    path: 'criar',
    component: SolicitacaoComponent,
  },
  {
    path: 'detalhe/:id',
    component: SolicitacaoViewDetalheComponent,
  },
];

@NgModule({
  declarations: [SolicitacaoComponent, SolicitacaoViewComponent, SolicitacaoViewDetalheComponent],
  imports: [
    RouterModule.forChild(routes),
    MatDividerModule,
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatProgressBarModule

  ],
  providers: [MatDatepickerModule],
  entryComponents: [SolicitacaoComponent],
})
export class SolicitacaoModule {}
