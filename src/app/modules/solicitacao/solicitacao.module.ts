import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule, Routes } from '@angular/router';
import { SolicitacaoComponent } from './solicitacao.component';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SolicitacaoViewComponent } from './solicitacao-view/solicitacao-view.component';
import { SolicitacaoViewDetalheComponent } from './solicitacao-view-detalhe/solicitacao-view-detalhe.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const routes: Routes = [
	{
		path: '',
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
		MatProgressBarModule,
		MatToolbarModule,
		MatProgressSpinnerModule,
		MatTooltipModule,
	],
	providers: [MatDatepickerModule],
	entryComponents: [SolicitacaoComponent],
})
export class SolicitacaoModule {}
