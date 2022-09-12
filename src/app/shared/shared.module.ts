// src/app/shared/shared.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MenuListItemComponent } from './components/menu-list-item/menu-list-item.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    MenuListItemComponent,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [ToolbarComponent],
})
export class SharedModule {}
