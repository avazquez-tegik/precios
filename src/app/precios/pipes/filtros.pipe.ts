import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtros'
})
export class FiltrosPipe implements PipeTransform {

  transform(items: any[], arg: any): any {


if (items) {
    let filterItemsTiendas= [];

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


    if (!arg.search) {
      return filterItems;
    }


    if (arg.search.trim() === '') {
      return filterItems;
    }




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



    return search_terms;
  }

}
}
