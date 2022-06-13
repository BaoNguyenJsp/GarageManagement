import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unixTimestamp'
})
export class UnixTimestampPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
