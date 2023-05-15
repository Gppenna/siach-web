import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InicioModule } from './modules/inicio/inicio.module';
import { AtividadesModule } from './modules/atividades/atividades.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpInterceptorService } from './core/security/http-intercept';
import { LogoutComponent } from './modules/logout/logout.component';
import { GuardComponent } from './core/security/guard/guard.component';
import { AdminComponent } from './modules/admin/admin.component';
import { RegistrarComponent } from './modules/registrar/registrar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GrupoSheet } from './modules/forms/grupo/grupo';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatInputModule } from '@angular/material/input';
import { MomentModule } from 'ngx-moment';

import { AtividadeSheet } from './modules/forms/atividade/atividade';
import { MatSelectModule } from '@angular/material/select';
import { DivulgacaoAtividadeSheet } from './modules/forms/divulgacao-atividade/divulgacao-atividade';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { SolicitacaoModule } from './modules/solicitacao/solicitacao.module';
import { SolicitacaoSheet } from './modules/forms/solicitacao/solicitacao';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { ChSheet } from './modules/forms/ch/ch';
import { PerfilModule } from './modules/perfil/perfil.module';
import { PerfilComponent } from './modules/perfil/perfil.component';
import { BarraProgressoComponent } from './modules/barra-progresso/barra-progresso.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
	declarations: [AppComponent, GrupoSheet, AtividadeSheet, DivulgacaoAtividadeSheet, SolicitacaoSheet, ChSheet],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		SharedModule,
		HttpClientModule,
		InicioModule,
		AtividadesModule,
		SolicitacaoModule,
		PerfilModule,
		MatToolbarModule,
		MatTooltipModule,
	],
	providers: [
		{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
		GuardComponent,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpInterceptorService,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
