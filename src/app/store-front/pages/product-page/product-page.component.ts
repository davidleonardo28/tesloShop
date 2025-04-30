import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@products/services/product.service';
import { ProductCarrouselComponent } from '../../../products/components/product-carrousel/product-carrousel.component';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [ProductCarrouselComponent],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent {
  activatedRoute = inject(ActivatedRoute);
  productService = inject(ProductsService);

  productIdslug = this.activatedRoute.snapshot.params['idSlug'];

  productResource = rxResource({
    request: () => ({ idSlug: this.productIdslug }),
    loader: ({ request }) =>
      this.productService.getProductByIdSlug(request.idSlug),
  });
}
