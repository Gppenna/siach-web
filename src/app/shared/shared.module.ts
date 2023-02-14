// src/app/shared/shared.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MenuListItemComponent } from './components/menu-list-item/menu-list-item.component';
import { BarraProgressoComponent } from '../modules/barra-progresso/barra-progresso.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [
    ToolbarComponent,
    MenuListItemComponent,
    BarraProgressoComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatProgressBarModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatIconModule,
    MatDividerModule,
    CommonModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatBottomSheetModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentModule,
    MatToolbarModule,
  ],
  exports: [
    CommonModule,
    MaterialModule,
    ToolbarComponent,
    MatProgressBarModule,
    BarraProgressoComponent,
    MatProgressBarModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatBottomSheetModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentModule,
    MatToolbarModule,
  ],
})
export class SharedModule {}
