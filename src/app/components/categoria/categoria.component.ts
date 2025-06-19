import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarcategoriaComponent } from './listarcategoria/listarcategoria.component';

@Component({
  selector: 'app-categoria',
  imports: [RouterOutlet, ListarcategoriaComponent],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css',
})
export class CategoriaComponent {
  constructor(public route: ActivatedRoute) {}
}
