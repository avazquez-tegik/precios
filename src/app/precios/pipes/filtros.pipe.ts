import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtros'
})
export class FiltrosPipe implements PipeTransform {

  transform(items: any[], arg: any): any {
  
    if (items) {
      let filterItemsTiendas = [];

      for (let i = 0; i < items.length; i++) {
        if (items[i]) {
          for (let atributo in arg.tiendas) {
            if (arg.tiendas[atributo] === true) {
              if (items[i].value === atributo) {
                filterItemsTiendas.push(items[i]);
              }
            }
          }
        }
      }



      let filterItems = [];

      for (let i = 0; i < filterItemsTiendas.length; i++) {

        if (filterItemsTiendas[i]) {

          let precio = parseFloat(filterItemsTiendas[i].precio);
          if (precio >= arg.min && precio < arg.max) {
            filterItems.push(filterItemsTiendas[i]);
          }

        }
      }

      filterItems = this.order(filterItems);
      if (!arg.search) {
        return filterItems;
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

      //search_terms = this.order(search_terms);
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
}
