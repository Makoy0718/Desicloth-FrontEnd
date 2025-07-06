import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DisenoService } from '../../../services/diseno.service';
import { GeneroCantidad } from '../../../models/generoCantidad';

@Component({
  selector: 'app-reportedisenosporgenero',
  imports: [
    BaseChartDirective,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './reportedisenosporgenero.component.html',
  styleUrl: './reportedisenosporgenero.component.css'
})
export class ReportedisenosporgeneroComponent implements OnInit {
  barCharOptions: ChartOptions = {
      responsive: true,
      plugins: {
      title: { display: true, text: 'Cantidad de galerias con diseños IA' }
      }
      };
    barCharLabels: string[] = [];
    barCharType: ChartType = 'polarArea';
    barCharLegend = true;
    barCharData: ChartDataset[] = [];
  

  constructor(private dS:DisenoService) { }

  ngOnInit(): void {
    this.dS.getCantidadPorGenero().subscribe((data: GeneroCantidad[]) => {
      this.barCharLabels = data.map(d => d.nombreGenero);
      this.barCharData = [
        {
          data: data.map(d => d.cantidadDisenos),
          label: 'Cantidad de Diseños',
          backgroundColor: ['#1D4ED8', '#E0F7FA' ],
          borderColor: '#3f51b5',
          pointBackgroundColor: '#3f51b5',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#3f51b5',
        }
      ];
    });
  }



}
