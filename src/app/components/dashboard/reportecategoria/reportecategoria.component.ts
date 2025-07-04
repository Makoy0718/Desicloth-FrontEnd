import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CategoriaService } from '../../../services/categoria.service';
import { ConteoDisenosPorCategoriaDTO } from '../../../models/ConteoDisenosPorCategoriaDTO';

@Component({
  selector: 'app-reportecategoria',
  imports: [BaseChartDirective],
  templateUrl: './reportecategoria.component.html',
  styleUrl: './reportecategoria.component.css'
})
export class ReportecategoriaComponent implements OnInit{
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true, 
        title: {
          display: true,
          text: 'Cantidad de Diseños' 
        },
        ticks: {
          stepSize: 1 
        }
      },
      x: {
        title: {
          display: true,
          text: 'Categoría' 
        }
      }
    },
    plugins: {
      legend: {
        position: 'top', 
      },
      title: {
        display: true,
        text: 'Cantidad de Diseños por Categoría' 
      }
    }
  };

  barChartLabels: string[] = []; 
  barChartType: ChartType = 'bar'; 
  barChartLegend = true;
  barChartData: ChartDataset[] = []; 

  constructor(private cS: CategoriaService) {} 

  ngOnInit(): void {
    this.cS.getConteoDisenosPorCategoria().subscribe(
      (data: ConteoDisenosPorCategoriaDTO[]) => {
        this.barChartLabels = data.map(item => item.nombreCategoria);

        this.barChartData = [
          {
            data: data.map(item => item.cantidadDisenos),
            label: 'Número de Diseños',
            backgroundColor: 'rgba(75, 192, 192, 0.6)', 
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
            hoverBorderColor: 'rgba(75, 192, 192, 1)',
          }
        ];
      },
      (error) => {
        console.error('Error al cargar el conteo de diseños por categoría:', error);
      }
    );
  }

}
