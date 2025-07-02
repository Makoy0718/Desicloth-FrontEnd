import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarroleComponent } from './listarrole/listarrole.component';

@Component({
  selector: 'app-role',
  imports: [RouterOutlet, ListarroleComponent],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent {
  constructor(public route: ActivatedRoute) {}
}
