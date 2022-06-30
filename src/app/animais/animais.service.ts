import { TokenService } from './../autenticacao/token.service';
import { catchError, mapTo, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Animais, Animal } from './animal';
import { environment } from 'src/environments/environment';

const API = environment.apiUrl;
const NOT_MODIFIED = '304'; // resposta para quando o usuario ja deu like naquela post

@Injectable({
  providedIn: 'root',
})
export class AnimaisService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  listaDoUsuario(nomeUsuario: string): Observable<Animais> {
    return this.http.get<Animais>(`${API}/${nomeUsuario}/photos`);
  }

  buscaPorId(id: number): Observable<Animal> {
    return this.http.get<Animal>(`${API}/photos/${id}`);
  }

  excluirPost(id: number): Observable<Animal> {
    return this.http.delete<Animal>(`${API}/photos/${id}`);
  }

  curtirPost(id: number): Observable<boolean> {
    return this.http.post(
      `${API}/photos/${id}/likes`,
      {},
      { observe: 'response' } //vai passar a response inteira
    ).pipe( // manipula o fluxo da requisicao
      mapTo(true), // se a requisicao teve sucesso, retorna true
      catchError((error) => {
        return error.status === NOT_MODIFIED ? of(false) : throwError(error); // retorna falso se ja deu like ou a msg de error se deu erro
      })
    );
  }
}
