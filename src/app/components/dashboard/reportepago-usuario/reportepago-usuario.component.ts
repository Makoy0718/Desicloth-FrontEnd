import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { PagoService } from '../../../services/pago.service';
import { UsuarioMontoDTO } from '../../../models/UsuarioMontoDTO';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-reporte-pagos-usuario',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, MatIconModule],
  templateUrl: './reportepago-usuario.component.html',
  styleUrl: './reportepago-usuario.component.css'
})
export class ReportePagosUsuarioComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Total de pagos por usuario' },
      legend: { display: true, position: 'top' },
    }
  };

  barChartType: ChartType = 'bar';
  barChartLegend = true;

  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

    constructor(private pagoService: PagoService) {}

  ngOnInit(): void {
    this.pagoService.obtenerTotalPagosPorUsuario().subscribe((data: UsuarioMontoDTO[]) => {
      this.barChartData = {
        labels: data.map(u => u.nombreUsuario),
        datasets: [
          {
            data: data.map(u => u.totalPagado),
            label: 'Total Pagado S/',
            backgroundColor: '#2196F3',
            borderColor: '#1976D2',
            borderWidth: 1
          }
        ]
      };
    });
  }
}
