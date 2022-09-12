import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterModule, Routes } from '@angular/router';
import { UnderConstructionComponent } from './under-construction.component';
const routes: Routes = [
  {
    path: '',
    component: UnderConstructionComponent,
  },
];

@NgModule({
  declarations: [UnderConstructionComponent],
  imports: [
    RouterModule.forChild(routes),
  ],
  providers: [MatDatepickerModule],
  entryComponents: [UnderConstructionComponent],
})
export class UnderConstructionModule {}
