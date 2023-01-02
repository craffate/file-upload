import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'size'
})
export class SizePipe implements PipeTransform {
  private readonly sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  private readonly k: number = 1024;

  transform(value: number, decimals: number = 2): string {
    let idx: number;
    let ret: string;

    idx = Math.floor(Math.log(value) / Math.log(this.k));
    ret = `${parseFloat((value / Math.pow(this.k, idx)).toFixed(decimals))} ${this.sizes[idx]}`;

    return ret;
  }

}
