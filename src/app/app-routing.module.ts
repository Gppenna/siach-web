import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardComponent } from './core/security/guard/guard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    canActivate: [GuardComponent],
    loadChildren: () =>
      import('./modules/inicio/inicio.module').then(
        (m) => m.InicioModule
      ),
  },
  {
    path: 'atividades',
    canActivate: [GuardComponent],
    loadChildren: () =>
      import('./modules/atividades/atividades.module').then(
        (m) => m.AtividadesModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
  {
    path: 'logout',
    loadChildren: () =>
      import('./modules/logout/logout.module').then(
        (m) => m.LogoutModule
      ),
  },
  {
    path: 'em-construção',
    canActivate: [GuardComponent],
    loadChildren: () =>
      import('./modules/under-construction/under-construction.module').then(
        (m) => m.UnderConstructionModule
      ),
  },
  { path: '**', redirectTo: 'inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    onSameUrlNavigation: 'reload',
  }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
