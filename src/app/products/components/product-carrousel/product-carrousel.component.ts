import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  OnChanges,
  SimpleChanges,
  viewChild,
} from '@angular/core';

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';

@Component({
  selector: 'product-carrousel',
  standalone: true,
  imports: [ProductImagePipe],
  templateUrl: './product-carrousel.component.html',
  styles: `
    .swiper {
      width: 100%;
      height: 500px;
    }
  `,
})
export class ProductCarrouselComponent implements OnChanges {
  images = input.required<string[]>();
  swiperDiv = viewChild.required<ElementRef>('swiperDiv');

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images']) {
      // Esperamos a que el DOM esté completamente renderizado con las nuevas imágenes
      queueMicrotask(() => this.swiperInit());
    }
  }

  swiperInit() {
    const element = this.swiperDiv().nativeElement;
    if (!element) return;

    // Destruir swiper previo si existe
    if (element.swiper) {
      element.swiper.destroy(true, true);
    }

    const swiper = new Swiper(element, {
      direction: 'horizontal',
      loop: true,

      modules: [Navigation, Pagination],

      pagination: {
        el: element.querySelector('.swiper-pagination'),
        clickable: true,
      },

      navigation: {
        nextEl: element.querySelector('.swiper-button-next'),
        prevEl: element.querySelector('.swiper-button-prev'),
      },

      scrollbar: {
        el: element.querySelector('.swiper-scrollbar'),
      },
    });
  }
}
