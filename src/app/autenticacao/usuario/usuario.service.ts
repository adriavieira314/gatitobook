import { TokenService } from './../token.service';
import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  // recebe e envia informacoes
  // BehaviorSubject = ao fazer subscribe nesse subject, é enviado o ultimo dado salvo nele
  private usuarioSubject = new BehaviorSubject<Usuario>({});

  constructor(private tokenService: TokenService) {
    // se ja existe token, notifico
    if (this.tokenService.possuiToken()) {
      this.decodificaJWT();
    }
  }

  private decodificaJWT() {
    const token = this.tokenService.retornaToken();
    const usuario = jwt_decode(token) as Usuario;
    // envio para todo mundo que se inscreveu no serviço essa informação do usuario
    this.usuarioSubject.next(usuario);
  }

  retornaUsuario() {
    // somente esse serviço vai manipular o subject
    // so recebe informacoes
    return this.usuarioSubject.asObservable();
  }

  salvaToken(token: string) {
    this.tokenService.salvaToken(token);
    this.decodificaJWT();
  }

  logout() {
    this.tokenService.excluiToken();
    // notificando que nao possui usuario nenhum enviando um objeto vazio
    this.usuarioSubject.next({});
  }

  estaLogado() {
    return this.tokenService.possuiToken();
  }
}
