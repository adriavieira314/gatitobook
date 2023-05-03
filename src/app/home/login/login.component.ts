import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/autenticacao/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: string = '';
  senha: string = '';

  constructor(
    private authService: AutenticacaoService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  load() {
    this.authService.autenticar(this.usuario, this.senha).subscribe({
      next: (res) => {
        console.log('Autenticado com sucesso');
        console.log(res);
        this.router.navigate(['animais']);

      },
      error: (error) => {
        alert('Usuário ou senha incorretos.');
        console.log(error);
      },
    });
  }
}
