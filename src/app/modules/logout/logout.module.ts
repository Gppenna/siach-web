
import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { LogoutComponent } from './logout.component';



const routes: Routes = [
  {
    path: '',
    component: LogoutComponent,
  },
];

@NgModule({
  declarations: [LogoutComponent],
  imports: [
    RouterModule.forChild(routes),
    MatDividerModule,
    CommonModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [MatDatepickerModule],
  entryComponents: [LogoutComponent],
})
export class LogoutModule {}
