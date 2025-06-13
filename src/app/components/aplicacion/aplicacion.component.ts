
import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListaraplicacionComponent } from './listaraplicacion/listaraplicacion.component';


@Component({
  selector: 'app-aplicacion',
  imports: [RouterOutlet, ListaraplicacionComponent],
  templateUrl: './aplicacion.component.html',
  styleUrl: './aplicacion.component.css',
})
export class AplicacionComponent {
  constructor(public route:ActivatedRoute) {}

}
