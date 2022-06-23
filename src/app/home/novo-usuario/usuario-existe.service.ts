import { AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { NovoUsuarioService } from './novo-usuario.service';
import { first, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioExisteService {
  constructor(private novoUsuarioService: NovoUsuarioService) {}

  usuarioJaExiste() {
    return (control: AbstractControl) => {
      // retorna um observable que vai representar o valro
      return control.valueChanges.pipe(
        // faz a troca de digitacao para a requisicao
        // recebe o valor do primeiro fluxo e entrega para um observable
        switchMap((nomeUsuario) =>
          this.novoUsuarioService.verificaUsuarioExistente(nomeUsuario)
        ),
        // a requisicao retorna true ou false
        // se existe, retorna msg de alerta
        map((usuarioExiste) =>
          usuarioExiste ? { usuarioExistente: true } : null
        ),
        // para finalizar o fluxo
        first()
      );
    };
  }
}
