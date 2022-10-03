import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'inicio',
    loadChildren: () =>
      import('./modules/inicio/inicio.module').then(
        (m) => m.InicioModule
      ),
  },
  {
    path: 'em-construção',
    loadChildren: () =>
      import('./modules/under-construction/under-construction.module').then(
        (m) => m.UnderConstructionModule
      ),
  },
  { path: '**', redirectTo: 'em-construção', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    onSameUrlNavigation: 'reload',
  }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
