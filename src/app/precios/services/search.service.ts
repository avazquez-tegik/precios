import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { mergeMap } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public url = "https://sohdv5hx2k.execute-api.us-east-1.amazonaws.com/prod/compras/";

  constructor(private http: Http) {}


  public search(cadena: any, texto: string, page): Observable < any > {
    console.log("CADENA", cadena);

    var headers = new Headers({
      'Content-Type': 'application/json'
    });

    var url = this.url + cadena + "?value=" + encodeURI(texto) + "&page=" + page;

    return this.http.get(encodeURI(url), { headers: headers }).map(res => {
      return res.json();

    });;
  }
}
