import { Component, OnInit,} from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { GaleriaService } from '../../../services/galeria.service';



@Component({
  selector: 'app-reporteia',
  imports: [
    BaseChartDirective,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './reporteia.component.html',
  styleUrl: './reporteia.component.css',
})
export class ReporteiaComponent implements OnInit {
  barCharOptions: ChartOptions = {
		responsive: true,
		plugins: {
		title: { display: true, text: 'Cantidad de galerias con diseños IA' }
		}
  	};
	barCharLabels: string[] = ['Con IA', 'Sin IA'];
	barCharType: ChartType = 'pie';
	barCharLegend = true;
	barCharData: ChartDataset[] = [];

  totalIA: number = 0;
  totalGeneral: number = 0;

	constructor(private gS: GaleriaService) {}

	ngOnInit(): void {

    this.gS.getGaleriasConIA().subscribe(data => {
      this.totalIA = data.totalGalerias;
      this.actualizarGrafico();
    });
    this.gS.getTotalGalerias().subscribe(data => {
      this.totalGeneral = data.total;
      this.actualizarGrafico();
    });
  }

  actualizarGrafico(): void {
    if (this.totalIA !== 0 || this.totalGeneral !== 0) {
      let sinIA = this.totalGeneral - this.totalIA;
      
      this.barCharData = [
        {
          data: [this.totalIA, sinIA],
          label: 'Cantidad de galerias',
          backgroundColor: ['#1D4ED8', '#f44336'],
          borderColor: ['#388e3c', '#d32f2f'],
          borderWidth: 1
        },
      ];
      console.log('Datos del gráfico actualizados:', this.barCharData);
    }
  }
}
