import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { PagoService } from '../../../services/pago.service';
import { Pago } from '../../../models/pago';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-reporte-top5pagos',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, MatIconModule],
  templateUrl: './reportepago.component.html',
  styleUrl: './reportepago.component.css'
})
export class ReporteTop5PagosComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Top 5 pagos más altos' },
      legend: { display: true, position: 'top' },
    }
  };

  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  //barChartData: ChartDataset[] = [];
  barChartData: ChartData<'bar'> = {
  labels: [],
  datasets: []
};

  constructor(private pagoService: PagoService) {}

  ngOnInit(): void {
    this.pagoService.obtenerTop5Pagos().subscribe((data: Pago[]) => {
      this.barChartData = {
        labels: data.map(p => `Pago #${p.idPago}`),
        datasets: [
          {
            data: data.map(p => p.montoPago),
            label: 'Monto en S/',
            backgroundColor: '#03A9F4',
            borderColor: '#0288D1',
            borderWidth: 1
          }
        ]
      };
    });
  }
}

