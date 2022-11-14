// src/app/shared/shared.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MenuListItemComponent } from './components/menu-list-item/menu-list-item.component';
import { BarraProgressoComponent } from '../modules/barra-progresso/barra-progresso.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    ToolbarComponent,
    MenuListItemComponent,
    BarraProgressoComponent,
  ],
  imports: [CommonModule, MaterialModule, MatProgressBarModule],
  exports: [ToolbarComponent, BarraProgressoComponent],
})
export class SharedModule {}
