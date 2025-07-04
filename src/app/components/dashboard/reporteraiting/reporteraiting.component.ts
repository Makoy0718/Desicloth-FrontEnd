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
    // Additional options to improve chart visualization
    scales: {
      y: {
        beginAtZero: false, // Start from 1, not 0
        title: {
          display: true,
          text: 'Rating Promedio', // Label for the Y-axis
        },
        min: 1, // Minimum rating value
        max: 5, // Maximum rating value
        ticks: {
          stepSize: 1, // Ensure ticks are at whole numbers (1, 2, 3, 4, 5)
        },
      },
    },
    plugins: {
      legend: {
        position: 'top', // Legend position
      },
      title: {
        display: true,
        text: 'Promedio de Rating por Galería', // Chart title
      },
    },
  };

  barCharLabels: string[] = []; // Gallery names
  barCharType: ChartType = 'line'; // Changed to 'line' chart type
  barCharLegend = true;
  barCharData: ChartDataset[] = []; // Rating data

  constructor(private gS: GaleriaService) {}

  ngOnInit(): void {
    // Call the list() method to get all galleries
    this.gS.list().subscribe(
      (data: Galeria[]) => {
        // Map gallery names for chart labels
        this.barCharLabels = data.map((galeria) => galeria.nombreGaleria);

        // Map gallery ratings for chart data
        this.barCharData = [
          {
            data: data.map((galeria) => galeria.ratingGaleria), // Use ratingGaleria
            label: 'Rating Promedio', // Label for the data line
            backgroundColor: 'rgba(63, 81, 181, 0.2)', // Light background for the area under the line
            borderColor: '#3f51b5', // Line color
            pointBackgroundColor: '#3f51b5', // Point color
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#3f51b5',
            fill: 'origin', // Fill the area under the line
          },
        ];
      },
      (error) => {
        console.error('Error loading gallery data for the chart:', error);
        // You can add logic to display an error message in the UI
      }
    );
  }
}
