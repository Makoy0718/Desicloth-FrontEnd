import { Component } from '@angular/core';
import { ListarpedidoComponent } from "./listarpedido/listarpedido.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pedido',
  imports: [RouterOutlet, ListarpedidoComponent],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css'
})
export class PedidoComponent {
  constructor(public route:ActivatedRoute) {}

}
