import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DisenoService } from '../../../services/diseno.service';

@Component({
  selector: 'app-reportedisenos',
  imports: [BaseChartDirective],
  templateUrl: './reportedisenos.component.html',
  styleUrl: './reportedisenos.component.css'
})
export class ReportedisenosComponent {
	barCharOptions: ChartOptions = {
    	responsive: true
  	}

	barCharLabels: string[] = []
  	barCharType: ChartType = 'bar'
  	barCharLegend = true
  	barCharData: ChartDataset[] = []

	constructor(private dS: DisenoService) {}

	ngOnInit(): void {
		this.dS.getAvrgPreciosDiseno().subscribe(data=>{
			this.barCharLabels = data.map(item => item.origen)
			this.barCharData = [
				{
				data:data.map(item => item.precioPromedio),
				label: 'Precio Promedio',
				backgroundColor: [
					'#2a2dd1',
					'#9293e0'
				],
				borderColor: '#131570',
				borderWidth: 1
				}
			]
		})
  	}
}
