import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    // se usuario nao estiver logado, o usuario retorna para tela de login
    if (!this.usuarioService.estaLogado()) {
      this.router.navigate(['']);
      return false;
    }

    return true;
  }
}
