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
import {MatDividerModule} from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpInterceptorService } from './core/security/http-intercept';
import { LogoutComponent } from './modules/logout/logout.component';
import { GuardComponent } from './core/security/guard/guard.component';
import { AdminComponent } from './modules/admin/admin.component';
import { RegistrarComponent } from './modules/registrar/registrar.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { GrupoSheet } from './modules/forms/grupo/grupo';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatInputModule } from '@angular/material/input';
import { MomentModule } from 'ngx-moment';

import { AtividadeSheet } from './modules/forms/atividade/atividade';
import { MatSelectModule } from '@angular/material/select';
import { DivulgacaoAtividadeSheet } from './modules/forms/divulgacao-atividade/divulgacao-atividade';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    GrupoSheet,
    AtividadeSheet,
    DivulgacaoAtividadeSheet
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    InicioModule,
    AtividadesModule,
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
    MomentModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    GuardComponent,
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
