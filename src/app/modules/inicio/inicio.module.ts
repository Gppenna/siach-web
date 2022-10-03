
import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio.component';
const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
  },
];

@NgModule({
  declarations: [InicioComponent],
  imports: [
    RouterModule.forChild(routes),
  ],
  providers: [MatDatepickerModule],
  entryComponents: [InicioComponent],
})
export class InicioModule {}
