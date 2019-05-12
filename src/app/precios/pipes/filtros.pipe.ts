import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtros'
})
export class FiltrosPipe implements PipeTransform {

  transform(value: any, filterPost: any, filterPriceMin: any, filterPriceMax: any): any {
    if (filterPost === '' && filterPriceMin === 0 && filterPriceMax === 500000) { return value; }
    const resultPosts = [];
    for (const post of value) {
      if (
      post.titulo.toLowerCase().indexOf(filterPost.toLowerCase()) > -1
      && post.precio >= filterPriceMin
      && post.precio <= filterPriceMax
      ) {
        resultPosts.push(post);
      }
    }
    return resultPosts;
  }

}
