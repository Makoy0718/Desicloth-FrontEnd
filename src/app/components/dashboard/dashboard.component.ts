import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet} from '@angular/router';
import { ReportedisenosComponent } from './reportedisenos/reportedisenos.component';
import { ReporteraitingComponent } from "./reporteraiting/reporteraiting.component";

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, ReportedisenosComponent, ReporteraitingComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(public route:ActivatedRoute){
	}
}
