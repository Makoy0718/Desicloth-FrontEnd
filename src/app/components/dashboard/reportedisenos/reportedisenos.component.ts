import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DisenoService } from '../../../services/diseno.service';
import { ConteoDisenoCategoriaOrigenDTO } from '../../../models/ConteoDisenoCategoriaOrigenDTO';
import { Diseno } from '../../../models/diseno';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-reportedisenos',
  imports: [
    BaseChartDirective, MatCardModule,
    MatButtonModule, MatIconModule,
    CommonModule, MatPaginatorModule
  ],
  templateUrl: './reportedisenos.component.html',
  styleUrl: './reportedisenos.component.css'
})
export class ReportedisenosComponent implements OnInit {
	barCharOptions: ChartOptions = {
		responsive: true,
		plugins: {
		title: { display: true, text: 'Precio promedio por origen de diseño' }
		}
  	};
	barCharLabels: string[] = [];
	barCharType: ChartType = 'bar';
	barCharLegend = true;
	barCharData: ChartDataset[] = [];

	conteoLabels: string[] = [];
	conteoType: ChartType = 'bar';
	conteoLegend = true;
	conteoOptions: ChartOptions = {
		responsive: true,
		plugins: {
		title: { display: true, text: 'Cantidad de Diseños por Categoría y Origen' }
		}
	};
	conteoData: ChartDataset[] = [];

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	disenosRecientes: Diseno[] = [];
	pageSize = 2;
	paginaActual = 0;

	constructor(private dS: DisenoService) {}

	ngOnInit(): void {
		this.generarGraficoPrecioPromedio();
		this.generarGraficoConteoDisenos();
		this.cargarDisenosRecientes();
	}

	cargarDisenosRecientes() {
		this.dS.getDisenosRecientes().subscribe(data => {
    		this.disenosRecientes = data;
  		});
	}

	get disenosPaginados(): Diseno[] {
		const start = this.paginaActual * this.pageSize;
		return this.disenosRecientes.slice(start, start + this.pageSize);
	}

	// cuando cambia la página
	cambiarPagina(event: PageEvent): void {
		this.pageSize = event.pageSize;
		this.paginaActual = event.pageIndex;
	}

	generarGraficoPrecioPromedio() {
		this.dS.getAvrgPreciosDiseno().subscribe(data => {
		this.barCharLabels = data.map(item => item.origen);
		this.barCharData = [{
			data: data.map(item => item.precioPromedio),
			label: 'Precio Promedio',
			backgroundColor: ['#2a2dd1', '#9293e0'],
			borderColor: '#131570',
			borderWidth: 1
		}];
		});
	}

	generarGraficoConteoDisenos() {
		this.dS.getConteoDisenosPorCategoriaYOrigen().subscribe((data: ConteoDisenoCategoriaOrigenDTO[]) => {
		const categorias = [...new Set(data.map(d => d.categoria))];
		const origenes = [...new Set(data.map(d => d.origen))];

		this.conteoLabels = categorias;

		this.conteoData = origenes.map(origen => ({
			label: origen,
			data: categorias.map(cat => {
			const found = data.find(d => d.categoria === cat && d.origen === origen);
			return found ? found.cantidad : 0;
			}),
			backgroundColor: this.colorAleatorio()
		}));
		});
	}

	colorAleatorio() {
		const r = () => Math.floor(Math.random() * 200);
		return `rgba(${r()},${r()},${r()},0.7)`;
	}
}
