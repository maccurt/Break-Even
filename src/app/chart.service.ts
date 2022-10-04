import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts'; //TODO is this blowing up the package check

export class PieChartData {
    name!: string;
    color!: string;
    y!: number;
    sliced?: boolean;
}

export class ChartOptions {
    slicedOffset = 10;
}

@Injectable({
    providedIn: 'root'
})
export class ProfitDreamerChartService {

    constructor() {

        Highcharts.setOptions({ lang: { thousandsSep: ',' } });
    }

    pieChartOptions(title: string, pieChartDataList: PieChartData[], chartOptions: ChartOptions = new ChartOptions()): Highcharts.Options {

        pieChartDataList = pieChartDataList.filter((d) => {
            return d.y > 0;
        });

        let options: Highcharts.Options = {
            lang: {
                thousandsSep: ','
            },
            tooltip: { valueDecimals: 2, valuePrefix: '$', },
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
                        distance: 15
                    },

                }
            },
            series: [
                {
                    type: 'pie' as any,
                    name: '',
                    data: pieChartDataList
                }
            ]
        };

        return options;
    }
}