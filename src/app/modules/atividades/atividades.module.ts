import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule, Routes } from '@angular/router';
import { AtividadesComponent } from './atividades.component';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { AtividadesModalComponent } from './atividades-modal/atividades-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const routes: Routes = [
	{
		path: '',
		component: AtividadesComponent,
	},
];

@NgModule({
	declarations: [AtividadesComponent, AtividadesModalComponent],
	imports: [RouterModule.forChild(routes), MatDividerModule, CommonModule, MatDialogModule, MatIconModule, MatProgressSpinnerModule],
	providers: [MatDatepickerModule],
	entryComponents: [AtividadesComponent],
})
export class AtividadesModule {}
