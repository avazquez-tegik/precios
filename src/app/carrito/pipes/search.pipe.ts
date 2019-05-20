import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], arg: any): any {
 if (!items) {
      return items;
    }



    if (!arg.search)
      return items;


    if (arg.search.trim() == '')
      return items;




    let words: string[] = arg.search.split(' ');

    let search_terms = items.filter(item => {

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



    return search_terms;  }

}
