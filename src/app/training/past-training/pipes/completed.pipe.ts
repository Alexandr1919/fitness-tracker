import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'completed'
})
export class CompletedPipe implements PipeTransform {
  transform(value?: any, ...args): any {
    if (value && value === 'completed') return 'Completed';
    else return value;
  }
}
