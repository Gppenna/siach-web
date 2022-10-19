
import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { AdminComponent } from './admin.component';
import {MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';



const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
  },
];

@NgModule({
  declarations: [AdminComponent],
  imports: [
    RouterModule.forChild(routes),
    MatDividerModule,
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule
  ],
  providers: [MatDatepickerModule],
  entryComponents: [AdminComponent],
})
export class AdminModule {}
