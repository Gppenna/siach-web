
import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule, Routes } from '@angular/router';
import { AtividadesComponent } from './atividades.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: AtividadesComponent,
  },
];

@NgModule({
  declarations: [AtividadesComponent],
  imports: [
    RouterModule.forChild(routes),
    MatDividerModule,
    CommonModule
  ],
  providers: [MatDatepickerModule],
  entryComponents: [AtividadesComponent],
})
export class AtividadesModule {}
