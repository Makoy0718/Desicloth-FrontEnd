import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet} from '@angular/router';


@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(public route:ActivatedRoute){
	}
}
