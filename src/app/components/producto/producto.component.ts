import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarproductoComponent } from './listarproducto/listarproducto.component';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-producto',
  imports: [RouterOutlet, ListarproductoComponent, MatCardModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css',
})
export class ProductoComponent {
  constructor(public route:ActivatedRoute) {}
}
