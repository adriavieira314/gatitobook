import { AnimaisService } from './../animais.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Animal } from '../animal';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalhe-animal',
  templateUrl: './detalhe-animal.component.html',
  styleUrls: ['./detalhe-animal.component.css'],
})
export class DetalheAnimalComponent implements OnInit {
  animalId!: number;
  animais$!: Observable<Animal>;

  constructor(
    private animaisService: AnimaisService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.animalId = this.activatedRoute.snapshot.params['animalId'];
    this.animais$ = this.animaisService.buscaPorId(this.animalId);
  }

  curtir() {
    this.animaisService.curtirPost(this.animalId).subscribe((curtida) => {
      if (curtida) {
        this.animais$ = this.animaisService.buscaPorId(this.animalId);
      }
    });
  }

  excluir() {
    this.animaisService.excluirPost(this.animalId).subscribe(
      () => {
        this.router.navigate(['/animais']);
      },
      (error) => {
        alert(error);
        console.error(error);
      }
    );
  }
}
