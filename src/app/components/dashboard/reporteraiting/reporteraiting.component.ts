import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { GaleriaService } from '../../../services/galeria.service';
import { Galeria } from '../../../models/galeria';

@Component({
  selector: 'app-reporteraiting',
  imports: [BaseChartDirective],
  templateUrl: './reporteraiting.component.html',
  styleUrl: './reporteraiting.component.css',
})
export class ReporteraitingComponent implements OnInit {
  barCharOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false, 
        title: {
          display: true,
          text: 'Rating Promedio', 
        },
        min: 1,
        max: 5, 
        ticks: {
          stepSize: 1, 
        },
      },
    },
    plugins: {
      legend: {
        position: 'top', 
      },
      title: {
        display: true,
        text: 'Promedio de Rating por Galería', 
      },
    },
  };

  barCharLabels: string[] = []; 
  barCharType: ChartType = 'line'; 
  barCharLegend = true;
  barCharData: ChartDataset[] = []; 

  constructor(private gS: GaleriaService) {}

  ngOnInit(): void {
    this.gS.list().subscribe(
      (data: Galeria[]) => {
        this.barCharLabels = data.map((galeria) => galeria.nombreGaleria);

        this.barCharData = [
          {
            data: data.map((galeria) => galeria.ratingGaleria), 
            label: 'Rating Promedio', 
            backgroundColor: 'rgba(63, 81, 181, 0.2)', 
            borderColor: '#3f51b5', 
            pointBackgroundColor: '#3f51b5', 
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#3f51b5',
            fill: 'origin', 
          },
        ];
      },
      (error) => {
        console.error('Error loading gallery data for the chart:', error);
      }
    );
  }
}
