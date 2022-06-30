import { AnimaisService } from './../animais.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Animal } from '../animal';
import { ActivatedRoute } from '@angular/router';

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
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.animalId = this.activatedRoute.snapshot.params['animalId'];
    this.animais$ = this.animaisService.buscaPorId(this.animalId);
  }
}
