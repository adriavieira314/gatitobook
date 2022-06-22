import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/autenticacao/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: string = '';
  senha: string = '';

  constructor(private authService: AutenticacaoService) { }

  ngOnInit(): void { }

  load() {
    this.authService.autenticar(this.usuario, this.senha).subscribe(() => {
      console.log('Autenticado com sucesso');

    }, (error) => {
        alert('Usuário ou senha incorretos.');
        console.log(error);
      }
    );

  }
}
