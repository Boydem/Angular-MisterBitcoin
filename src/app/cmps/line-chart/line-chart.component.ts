import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  @Input() chartData!: any;
  public chart: any;

  async ngOnInit() {
    this.createChart();
    console.log('this.chartData:', this.chartData);
  }

  createChart() {
    this.chart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: this.chartData.values.map((v: { x: number; y: number }) => {
          let date = new Date(v.x);
          const formattedDate = date.toLocaleString('he', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
          });
          return formattedDate;
        }),
        datasets: [
          {
            label: 'average USD market price',
            data: this.chartData.values.map(
              (v: { x: number; y: number }) => v.y
            ),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
    });
  }
}
