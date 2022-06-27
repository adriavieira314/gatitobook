import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './autenticacao/auth/auth-guard.guard';
import { LoginGuard } from './autenticacao/login-guard/login.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'animais',
    loadChildren: () => import('./animais/animais.module').then((m) => m.AnimaisModule),
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
