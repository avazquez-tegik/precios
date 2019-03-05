import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  private gridApi;
  private gridColumnApi;


  constructor() { }
  columnDefs = [
    {
     headerName: 'Make', field: 'make',
     sortable: true, filter: true, checkboxSelection: true, resizable: true,
     rowDrag: true
    },
    {
    headerName: 'Caracteristicas',
    children: [
    {headerName: 'Model', field: 'model', columnGroupShow: 'closed' },
    {headerName: 'Price', field: 'price',  columnGroupShow: 'open' },
    {headerName: 'Tipo', field: 'tipo',  columnGroupShow: 'open' },
    {headerName: 'Color', field: 'color',  columnGroupShow: 'open' }
    ]
    }
];

rowData = [
    { make: 'Toyota', model: 'Celica',  tipo: 'Sedan', color: 'Rojo', price: 35000 },
    { make: 'Ford', model: 'Mondeo', tipo: 'Sedan', color: 'Rojo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', tipo: 'Sedan', color: 'Azul', price: 72000 },
    { make: 'Toyota', model: 'Celica',  tipo: 'Sedan', color: 'Rojo', price: 35000 },
    { make: 'Ford', model: 'Mondeo', tipo: 'Sedan', color: 'Rojo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', tipo: 'Sedan', color: 'Azul', price: 72000 }
];

onBtExport() {
  let params: any;
params = {

    allColumns: getBooleanValue('#allColumns'),
    fileName: document.querySelector('#fileName').value,
    columnSeparator: document.querySelector('#columnSeparator').value
  };
  this.gridApi.exportDataAsCsv(params);
}

onGridReady(params) {
  this.gridApi = params.api;
  this.gridColumnApi = params.columnApi;
}

  ngOnInit() {
  }

}

function getBooleanValue(cssSelector) {
  return document.querySelector(cssSelector).checked === true;
}
