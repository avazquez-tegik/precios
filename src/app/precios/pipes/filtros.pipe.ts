import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtros'
})
export class FiltrosPipe implements PipeTransform {

  transform(items: any[], arg: any): any {
    console.log(items);

    if (!items) {
      return items;
    }


    let filterItems = [];

    for (let i = 0; i < items.length; i++) {
console.log(items[i]);

      if (items[i]) {

        let precio = parseFloat(items[i].precio);
        if (precio >= arg.min && precio < arg.max)
          filterItems.push(items[i]);

      }
    }


    if (!arg.search)
      return filterItems;


    if (arg.search.trim() == '')
      return filterItems;




    let words: string[] = arg.search.split(' ');

    let search_terms = filterItems.filter(item => {

      let titulo = item.titulo.toLowerCase().trim();
      let num_coincidencias = 0;

      for (let word of words) {
        word = word.toLowerCase().trim();

        if (titulo.toLowerCase().indexOf(word.toLowerCase()) >= 0)
          num_coincidencias += 1;

      }

      if (num_coincidencias >= words.length) {
        return item;
      }


    });



    return search_terms;
  }

}
