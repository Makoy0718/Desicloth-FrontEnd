import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListargeneroComponent } from './listargenero/listargenero.component';

@Component({
  selector: 'app-genero',
  imports: [RouterOutlet, ListargeneroComponent],
  templateUrl: './genero.component.html',
  styleUrl: './genero.component.css',
})
export class GeneroComponent {
  constructor(public route:ActivatedRoute) {}
}
