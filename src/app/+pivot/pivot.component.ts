import { Component, OnInit, ViewChild} from '@angular/core';
import { WebDataRocksPivot } from '../webdatarocks/webdatarocks.angular4';
import * as Highcharts from 'highcharts';

// DATOS
function getJSONData() {
  return [
    {
      'Country': 'Australia',
      'Category': 'Wood',
      'Price': 445,
      'Quantity': 464
    },
    {
      'Country': 'Australia',
      'Category': 'Bikes',
      'Price': 125,
      'Quantity': 440
    },
    {
      'Country': 'China',
      'Category': 'Clothing',
      'Price': 190,
      'Quantity': 310
    },
    {
      'Country': 'United States',
      'Category': 'Aircraft',
      'Price': 406,
      'Quantity': 127
    },
    {
      'Country': 'United States',
      'Category': 'Bikes',
      'Price': 85,
      'Quantity': 821
    },
    {
      'Country': 'United Kingdom',
      'Category': 'Cars',
      'Price': 21,
      'Quantity': 455
    },
    {
      'Country': 'Canada',
      'Category': 'Clothing',
      'Price': 666,
      'Quantity': 685
    },
    {
      'Country': 'Germany',
      'Category': 'Cars',
      'Price': 563,
      'Quantity': 742
    },
    {
      'Country': 'United Kingdom',
      'Category': 'Bikes',
      'Price': 397,
      'Quantity': 340
    },
    {
      'Country': 'Germany',
      'Category': 'Clothing',
      'Price': 500,
      'Quantity': 948
    }

  ];
}

@Component({
  selector: 'app-test',
  templateUrl: './pivot.component.html',
  styleUrls: ['./pivot.component.css']
})
export class PivotComponent implements OnInit {
  @ViewChild('pivot1') child: WebDataRocksPivot;

// TABLA PIVOTE
public pivotReport = {
  dataSource: {
    'dataSourceType': 'json',
    'data': getJSONData()
  },
  slice: {
    rows: [{ uniqueName: 'Country' }],
    columns: [{ uniqueName: 'Measures' }, { uniqueName: 'Category' }],
    measures: [{ uniqueName: 'Quantity', aggregation: 'sum' }]
  }
};
Highcharts: typeof Highcharts = Highcharts;

  onPivotReady(pivot: WebDataRocks.Pivot): void {
    console.log('[ready] WebDataRocksPivot', this.child);
  }

  customizeToolbar(toolbar: any) {
    let tabs: any;
    tabs = toolbar.getTabs();
    toolbar.getTabs = function (
    ) { console.log('uno');
    };
    }

  onCustomizeCell(
    cell: WebDataRocks.CellBuilder,
    data: WebDataRocks.Cell
  ): void {
    if (data.isClassicTotalRow) { cell.addClass('fm-total-classic-r'); }
    if (data.isGrandTotalRow) { cell.addClass('fm-grand-total-r'); }
    if (data.isGrandTotalColumn) { cell.addClass('fm-grand-total-c'); }
  }

  onReportComplete(): void {
    this.child.webDataRocks.off('reportcomplete');
    this.createChart();
    this.createBarChart();

  }


  // GRAFICA DE AREA
  createChart() {
    this.child.webDataRocks.highcharts.getData(
      {
          slice: {
            rows: [{ uniqueName: 'Country' }, { uniqueName: 'Category' }],
            columns: [{ uniqueName: 'Measures' }],
            measures: [{ uniqueName: 'Quantity', aggregation: 'sum' }]
          },
        type: 'column'
      },
      data => {
        this.Highcharts.setOptions({
          plotOptions: {
            series: {
              color: '#00a3cc' // set colors of the series
            }
          }
        });
        this.Highcharts.chart('highchartsContainer', data);
      },
      data => {
        this.Highcharts.setOptions({
          plotOptions: {
            series: {
              color: '#00a3cc' // set colors of the series
            }
          }
        });
        this.Highcharts.chart('highchartsContainer', data);
      }
    );
  }
/*Create a bar chart that shows a preconfigured slice*/
  createBarChart() {
    this.child.webDataRocks.highcharts.getData(
      {
        slice: {
          rows: [{ uniqueName: 'Category' }, { uniqueName: 'Country' }],
          columns: [{ uniqueName: 'Measures' }],
          measures: [{ uniqueName: 'Quantity', aggregation: 'sum' }]
        },
        type: 'pie'
      },
      data => {
        this.Highcharts.setOptions({
          plotOptions: {
            series: {
              color: '#00a3cc' // set colors of the series
            }
          }
        });
        this.Highcharts.chart('highchartsContainer-2', data);
      },
      data => {
        this.Highcharts.setOptions({
          plotOptions: {
            series: {
              color: '#00a3cc' // set colors of the series
            }
          }
        });
        this.Highcharts.chart('highchartsContainer-2', data);
      }
    );
  }

  constructor() { }

  ngOnInit() {
  }

}
