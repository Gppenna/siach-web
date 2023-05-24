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
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

const routes: Routes = [
	{
		path: '',
		component: AtividadesComponent,
	},
];

@NgModule({
	declarations: [AtividadesComponent, AtividadesModalComponent],
	imports: [RouterModule.forChild(routes), MatDividerModule, SharedModule, MatAutocompleteModule],
	providers: [MatDatepickerModule],
	entryComponents: [AtividadesComponent],
})
export class AtividadesModule {}
