import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
	exports: [
		MatSidenavModule,
		MatSliderModule,
		MatSlideToggleModule,
		MatToolbarModule,
		MatCheckboxModule,
		MatIconModule,
		MatButtonModule,
		MatTooltipModule,
		MatMenuModule,
		MatBadgeModule,
		MatListModule,
		MatSelectModule,
	],
})
export class MaterialModule {}
