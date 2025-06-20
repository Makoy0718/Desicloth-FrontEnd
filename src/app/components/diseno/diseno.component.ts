import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListardisenoComponent } from './listardiseno/listardiseno.component';

@Component({
  selector: 'app-diseno',
  imports: [RouterOutlet, ListardisenoComponent],
  templateUrl: './diseno.component.html',
  styleUrl: './diseno.component.css'
})
export class DisenoComponent {
	constructor(public route:ActivatedRoute){
	}
}
