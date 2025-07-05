import { Component } from '@angular/core';
import { ListarpagoComponent } from "./listarpago/listarpago.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pago',
  imports: [RouterOutlet,ListarpagoComponent],
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.css'
})
export class PagoComponent {
  constructor(public route:ActivatedRoute){}
}
