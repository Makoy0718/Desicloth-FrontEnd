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
        beginAtZero: true, // El eje Y debe empezar en 0 para conteos
        title: {
          display: true,
          text: 'Cantidad de Diseños' // Etiqueta para el eje Y
        },
        ticks: {
          stepSize: 1 // Asegura que las marcas sean números enteros
        }
      },
      x: {
        title: {
          display: true,
          text: 'Categoría' // Etiqueta para el eje X
        }
      }
    },
    plugins: {
      legend: {
        position: 'top', // Posición de la leyenda
      },
      title: {
        display: true,
        text: 'Cantidad de Diseños por Categoría' // Título del gráfico
      }
    }
  };

  barChartLabels: string[] = []; // Nombres de las categorías
  barChartType: ChartType = 'bar'; // Tipo de gráfico: barras
  barChartLegend = true;
  barChartData: ChartDataset[] = []; // Datos del conteo de diseños

  constructor(private cS: CategoriaService) {} // Inyecta CategoriaService

  ngOnInit(): void {
    // Llama al servicio para obtener los datos del conteo de diseños por categoría
    this.cS.getConteoDisenosPorCategoria().subscribe(
      (data: ConteoDisenosPorCategoriaDTO[]) => {
        // Mapea los nombres de las categorías para las etiquetas del gráfico
        this.barChartLabels = data.map(item => item.nombreCategoria);

        // Mapea las cantidades de diseños para los datos del gráfico
        this.barChartData = [
          {
            data: data.map(item => item.cantidadDisenos),
            label: 'Número de Diseños',
            backgroundColor: 'rgba(75, 192, 192, 0.6)', // Color de las barras
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
            hoverBorderColor: 'rgba(75, 192, 192, 1)',
          }
        ];
      },
      (error) => {
        console.error('Error al cargar el conteo de diseños por categoría:', error);
        // Puedes añadir lógica para mostrar un mensaje de error en la UI
      }
    );
  }

}
