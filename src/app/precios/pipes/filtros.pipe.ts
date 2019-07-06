
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtros'
})
export class FiltrosPipe implements PipeTransform {

  transform(items: any[], arg: any): any {


    console.log(items);
 //Outliers
    let precio = 0.0;
    let preciopromedio = 0.0;
    let sumaprecios = 0.0;
    let desvstd = 0.0;
    let preciocuadrado = 0.0;
    let preciocuadradosuma = 0.0;
    let z = 0.0;
    let filterItemsOutliers = [];
    for (let i = 0; i < items.length; i++) {
        precio = parseFloat(items[i].precio);
        preciocuadrado = Math.pow(precio, 2);
        preciocuadradosuma = preciocuadradosuma + preciocuadrado;
        sumaprecios = sumaprecios + parseFloat(items[i].precio);
        preciopromedio = sumaprecios / (i + 1);
        if ( items[i].end === true) {
            desvstd = Math.sqrt((preciocuadradosuma / (i + 1)) - Math.pow(preciopromedio, 2));
            console.log('desvstd = : ' + desvstd);
            for (let j = 0; j < items.length; j++) {
                z = (this.toNumber(items[j].precio) - preciopromedio) / desvstd;
                console.log(items[j].precio);
                console.log('Z' + j + ' = : ' + z);
                if ( (z >= -.6 && z <= 3)) {
                  filterItemsOutliers.push(items[j]);
                }

            }

        }

      }



    if (items) {
      let filterItemsTiendas = [];
      for (let i = 0; i < filterItemsOutliers.length; i++) {
        if (filterItemsOutliers[i]) {
          for (let atributo in arg.tiendas) {
            if (arg.tiendas[atributo] === true) {
              if (filterItemsOutliers[i].value === atributo) {
                filterItemsTiendas.push(filterItemsOutliers[i]);
              }
            }
          }
        }
      }






      let filterItems = [];
      for (let i = 0; i < filterItemsTiendas.length; i++) {
        if (filterItemsTiendas[i]) {
          let precio = parseFloat(filterItemsTiendas[i].precio);
          if ((precio >= arg.min && precio < arg.max) ) {
            filterItems.push(filterItemsTiendas[i]);
          }

        }
      }





      arg.search =  arg.search0 + ' ' +  arg.search;
      let words: string[] = arg.search.split(' ');
      let search_terms = filterItems.filter(item => {
        let titulo = item.titulo.toLowerCase().trim()
          .replace('Á', 'A')
          .replace('É', 'E')
          .replace('Í', 'I')
          .replace('Ó', 'O')
          .replace('Ú', 'U')
          .replace('á', 'a')
          .replace('é', 'e')
          .replace('í', 'i')
          .replace('ó', 'o')
          .replace('ú', 'u');
        let num_coincidencias = 0;
        for (let word of words) {
          word = word.toLowerCase().trim()
            .replace('Á', 'A')
            .replace('É', 'E')
            .replace('Í', 'I')
            .replace('Ó', 'O')
            .replace('Ú', 'U')
            .replace('á', 'a')
            .replace('é', 'e')
            .replace('í', 'i')
            .replace('ó', 'o')
            .replace('ú', 'u');
          if (titulo.toLowerCase().indexOf(word.toLowerCase()) >= 0) {
            num_coincidencias += 1;
          }
        }
        if (num_coincidencias >= words.length) {
          return item;
        }
      });

      filterItems = this.order(filterItems);
      if (!arg.search) {
        return ;
      }
      search_terms = this.order(search_terms);
      return search_terms;

    }
  }




  order(array: Array < any > ): Array < any > {
    if (!array || array === undefined || array.length === 0) { return []; }

    array.sort((a: any, b: any) => {
      if (Number(a.precio) < Number(b.precio)) {
        return -1;
      } else if (Number(a.precio) > Number(b.precio)) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;

  }


  toNumber(value: any){

    if(typeof value === 'number'){
      return value;
    } else if(typeof value === 'string'){
      return parseFloat(value);
    }

  }
}
