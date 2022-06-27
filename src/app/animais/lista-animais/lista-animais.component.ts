import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/autenticacao/usuario/usuario.service';
import { AnimaisService } from '../animais.service';
import { Animais } from '../animal';

@Component({
  selector: 'app-lista-animais',
  templateUrl: './lista-animais.component.html',
  styleUrls: ['./lista-animais.component.css'],
})
export class ListaAnimaisComponent implements OnInit {
  animais: Animais = [];

  constructor(
    private usuarioService: UsuarioService,
    private animaisService: AnimaisService
  ) {}

  ngOnInit(): void {
    this.usuarioService.retornaUsuario().subscribe((usuario) => {
      const userName = usuario.name ?? '';

      this.animaisService.listaDoUsuario(userName).subscribe((lista) => {
        this.animais = lista;
      });
    });
  }
}
