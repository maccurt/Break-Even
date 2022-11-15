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
    getBarChart = (title: string, data: any[], xAxisCategories: any[] = []): Highcharts.Options => {

        // see https://stackoverflow.com/questions/42866870/highcharts-progress-bar-chart/42871005#42871005
        Highcharts.setOptions({ lang: { thousandsSep: ',' } });

        let options: Highcharts.Options = {
            tooltip: { valueDecimals: 2, valuePrefix: '$', valueSuffix: ' USD' },
            chart: {
                type: 'bar',
                borderColor: 'red'

            },
            title: {
                text: title.length > 0 ? title : undefined, // If you want the title text you need to set this
                style: { fontWeight: 'bold' }
            },
            xAxis: {
                categories: xAxisCategories,
                labels: {
                    // useHTML: true,
                    // align: 'left',
                    // x: 0,
                    // y: -50, /* to be adjusted according to number of bars*/
                    // //reserveSpace: false,
                    style: {
                        //width: 350
                        fontWeight: 'bold',
                        fontSize: '16px',
                        color: 'black'
                    }
                }
            },
            yAxis: {
                title: undefined
                // stackLabels:{
                //   align:"center"
                // }

            },
            credits: {
                enabled: false
            },
            legend: {
                enabled: false // This removed the legend
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,  // I don't think this is currently show, you turned off labels below
                        format: '${point.y:,.2f}',
                        style: {
                            fontWeight: 'bold',
                            fontSize: '14px',
                            color: 'black'
                        }
                    },  // This is how you put 2 decimal points
                }
            },
            series: [
                {
                    type: 'bar' as any,
                    name: '',
                    data,
                    dataLabels: {
                        enabled: false // This will turn of the labels
                    }
                }
            ]
        };

        return options;
    };

    pieChartOptions(title: string, pieChartDataList: PieChartData[], chartOptions: ChartOptions = new ChartOptions()): Highcharts.Options {

        pieChartDataList = pieChartDataList.filter((d) => {
            return d.y > 0;
        });

        let options: Highcharts.Options = {
            chart: {
                type: 'pie',
                // margin: [0, 0, 0, 0],
                // spacingTop: 0,
                // spacingBottom: 0,
                // spacingLeft: 0,
                // spacingRight: 0
            },
            lang: {
                thousandsSep: ','
            },
            tooltip: { valueDecimals: 2, valuePrefix: '$', },

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
                        distance: 15,
                        style: {
                            fontSize: '20px' 
                        }
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