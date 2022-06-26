import { Component, Input, OnInit } from '@angular/core';

const API = "http://localhost:3000";

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {
  private urlOriginal: string = '';

  @Input() descricao: string = '';
  @Input() set url(url: string) {
    // nesse caso, a imagem esta dentro de uma pasta da aplicação e nao num http
    if (url.startsWith('data')) {
      this.urlOriginal = url;
    } else {
      this.urlOriginal = `${API}/imgs/${url}`;
    }
  }

  get url(): string {
    return this.urlOriginal;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
