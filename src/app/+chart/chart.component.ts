import { Component, OnInit } from '@angular/core';
import { NgModule, ViewChild, ElementRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { BrowserModule } from '@angular/platform-browser';
import * as  Highcharts from 'highcharts';
import More from 'highcharts/highcharts-more';
More(Highcharts);
import Drilldown from 'highcharts/modules/drilldown';
Drilldown(Highcharts);
// Load the exporting module.
import Exporting from 'highcharts/modules/exporting';
// Initialize exporting module.
Exporting(Highcharts);


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit {
  @ViewChild('container', { read: ElementRef }) container: ElementRef;

  constructor() {
  }
  ngOnInit() {
    Highcharts.chart(this.container.nativeElement, {
      // Created pie chart using Highchart
      chart: {
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 45
        }
      },
      title: {
        text: 'Contents using Pie chart'
      },
      subtitle: {
        text: '3D donut in Highcharts'
      },
      plotOptions: {
        pie: {
          innerSize: 100,
          depth: 45
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
      },
        series: [{
        name: 'Operating Systems',
        data: [
          {
            name: 'Windows',
            y: 88.19,
            drilldown: 'windows-versions'
          },
          ['MacOSX', 9.22],
          ['Linux', 1.58],
          ['Others', 1.01]
        ]
      }],
      drilldown: {
        series: [{
          name: 'Windows versions',
          id: 'windows-versions',
          data: [
            ['Win 7', 55.03],
            ['Win XP', 15.83],
            ['Win Vista', 3.59],
            ['Win 8', 7.56],
            ['Win 8.1', 6.18]
          ]
        }]
      }
    })
  }

}
