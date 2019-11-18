import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtros1'
})
export class Filtros1Pipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
