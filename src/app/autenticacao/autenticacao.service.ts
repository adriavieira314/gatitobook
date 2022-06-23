import { UsuarioService } from './usuario/usuario.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) {}

  // HttpResponse<any> = pega o todo, body, headers
  autenticar(usuario: string, senha: string): Observable<HttpResponse<any>> {
    return this.http.post(
      'http://localhost:3000/user/login',
      {
        userName: usuario,
        password: senha,
      },
      { observe: 'response' } // nao quero somente o body, quero o header da requisicao
    ).pipe(
      tap((response) => {
        const authToken = response.headers.get('x-access-token') ?? ''; //recebendo o token
        this.usuarioService.salvaToken(authToken); //salvando
      })
    );
  }
}
