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
import {MatDividerModule} from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { HttpInterceptorService } from './core/security/http-intercept';
import { LogoutComponent } from './modules/logout/logout.component';
import { GuardComponent } from './core/security/guard/guard.component';
import { AdminComponent } from './modules/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent
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
    FormsModule 
  ],
  providers: [
    GuardComponent,
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
