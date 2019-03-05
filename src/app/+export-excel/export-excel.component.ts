import { Component, OnInit } from '@angular/core';
import { aggregateBy, process } from '@progress/kendo-data-query';
import { products } from './products';

@Component({
  selector: 'app-export-excel',
  templateUrl: './export-excel.component.html',
  styleUrls: ['./export-excel.component.css']
})
export class ExportExcelComponent implements OnInit {

  public aggregates: any[] = [{field: 'UnitPrice', aggregate: 'sum'}];

  public group: any[] = [{
      field: 'Discontinued',
      aggregates: this.aggregates
  }];

  public data: any[] = process(products, {
      group: this.group
  }).data;

  public total: any = aggregateBy(products, this.aggregates);

  constructor() { }

  ngOnInit() {
  }

}
