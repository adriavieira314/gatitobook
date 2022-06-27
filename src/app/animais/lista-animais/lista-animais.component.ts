import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { UsuarioService } from 'src/app/autenticacao/usuario/usuario.service';
import { AnimaisService } from '../animais.service';
import { Animais } from '../animal';

@Component({
  selector: 'app-lista-animais',
  templateUrl: './lista-animais.component.html',
  styleUrls: ['./lista-animais.component.css'],
})
export class ListaAnimaisComponent implements OnInit {
  animais$!: Observable<Animais>;

  constructor(
    private usuarioService: UsuarioService,
    private animaisService: AnimaisService
  ) {}

  ngOnInit(): void {
    // pipe permite fazer manipulação com o retorno da chamada
    this.animais$ = this.usuarioService.retornaUsuario().pipe(
      // switchMap troca o fluxo de um service para outro service
      // no caso, mudei o fluxo de retornaUsuraio para lista de animais
      // recebe como parametro o retorno do primeiro fluxo
      switchMap((usuario) => {
        const userName = usuario.name ?? '';
        // essa declaração retorna a lista de animais do usuario
        // o retorno vai ser um observable
        return this.animaisService.listaDoUsuario(userName);
      })
    );
  }
}
