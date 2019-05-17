import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], value: string): any[] {

    if (!value) {
      return items;
    }

    let words: string[] = value.split(' ');
    console.log("word", words);

    let search_tems

    let search_tems = items.filter(item => {

        let titulo = item.titulo.toLowerCase().trim();
        let num_coincidencias = 0;

        for (let word of words) {
          word = word.toLowerCase().trim();

          if (titulo.toLowerCase().indexOf(word.toLowerCase()) >= 0)
            num_coincidencias += 1;

        }

        console.log("numero de coincidencias" + titulo + "el total es" +  words.length , num_coincidencias);

console.log(typeof words.length);
console.log(typeof num_coincidencias)

        if(num_coincidencias >= words.length){
        	console.log("envio");
        	return item;
        }
        
      
    });



    return search_tems;
  }

}
