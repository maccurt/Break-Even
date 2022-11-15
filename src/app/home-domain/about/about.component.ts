import { HelpService } from './../../help/help.service';
import { Component, OnInit } from '@angular/core';
import { PieChartData } from 'src/app/chart/pie-chart-data.class';
import { ProfitDreamerChartService } from 'src/app/chart/profit-dreamer-chart.service';
import { ProfitDreamerChart } from 'src/app/chart/chart-data.class.';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  chart1!: ProfitDreamerChart;
  chart2:ProfitDreamerChart;

  constructor(public help: HelpService, private chartService: ProfitDreamerChartService) {

    this.chart1 = new ProfitDreamerChart();    
    this.chart1.data.push(new PieChartData('Bootstrap Grid', '#b3d9ff', 30, false));
    this.chart1.data.push(new PieChartData('Angular High Charts', '#ffdd99', 20, false));
    this.chart1.data.push(new PieChartData('Home Page', '#8cd98c', 50,true));

    this.chart2 = new ProfitDreamerChart();
    this.chart2.title = 'Fruit We Eat';
    this.chart2.data.push(new PieChartData('Apples', '#B7DEEB', 30, false));
    this.chart2.data.push(new PieChartData('Oranges', '#B7B7EB', 20, false));
    this.chart2.data.push(new PieChartData('Pears', '#B7D1EB', 50,true));
    this.chart2.data.push(new PieChartData('Pears', '#D1B7EB', 50,true));

  }
}
