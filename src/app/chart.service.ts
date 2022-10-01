import { Injectable } from '@angular/core';
//TODO is this blowing up the package size? check
// import * as Highcharts from 'highcharts';

export class PieChartData {
    name!: string;
    color!: string;
    y!: number;
    sliced?: boolean;
}

export class ChartOptions {
    slicedOffset = 20;
}

@Injectable({
    providedIn: 'root'
})
export class ProfitDreamerChartService {

    constructor() { }

    pieChartOptions(title: string, pieChartDataList: PieChartData[], chartOptions: ChartOptions = new ChartOptions()): Highcharts.Options {

        pieChartDataList = pieChartDataList.filter((d) => {
            return d.y > 0;
        });

        let options: Highcharts.Options = {
            chart: {
                type: 'pie'
            },
            title: {
                text: title === '' ? undefined : title,
                style: { fontWeight: 'bold' }
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    innerSize: 0,
                    allowPointSelect: false,
                    cursor: 'pointer',
                    showInLegend: false,
                    borderColor: 'black',
                    dataLabels: {
                        enabled: true,
                        distance: 10
                    }
                }
            },
            series: [
                {
                    type: 'pie' as any,
                    name: '',
                    data: pieChartDataList,
                    slicedOffset: chartOptions.slicedOffset
                }
            ]
        };

        return options;
    }
}