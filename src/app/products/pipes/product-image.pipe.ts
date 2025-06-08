import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseurl;

@Pipe({
  name: 'productImage',
  standalone: true,
})
export class ProductImagePipe implements PipeTransform {
  transform(value: null | string | string[]): string {
    if (value === null) {
      return 'assets/images/no-imagen.jpg';
    }

    if (typeof value === 'string' && value.startsWith('blob:')) {
      return value;
    }
    if (typeof value === 'string') {
      return `${baseUrl}/files/product/${value}`;
    }

    const image = value.at(0);

    if (!image) {
      return 'assets/images/no-imagen.jpg';
    }

    return `${baseUrl}/files/product/${image}`;
  }
}
