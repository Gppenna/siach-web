import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio.component';
import { InicioModalComponent } from './inicio-modal/inicio-modal.component';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '../../shared/shared.module';
import { MatExpansionModule } from '@angular/material/expansion';

const routes: Routes = [
	{
		path: '',
		component: InicioComponent,
	},
];

@NgModule({
	declarations: [InicioComponent, InicioModalComponent],
	imports: [
		RouterModule.forChild(routes),
		MatExpansionModule,
		MatDividerModule,
		CommonModule,
		MatTooltipModule,
		MatDialogModule,
		MatIconModule,
		SharedModule,
	],
	providers: [MatDatepickerModule],
	entryComponents: [InicioComponent],
})
export class InicioModule {}
