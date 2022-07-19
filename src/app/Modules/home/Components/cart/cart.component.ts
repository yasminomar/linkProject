import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ProductInCartReadDto,ProductInCartUpdateDto} from '../Models/cart.model';
import { ProductsService } from '../ProductService/Products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartId: string = '';
  productsInCartReadDto: ProductInCartReadDto[] = [];
  ServerBase = environment.ServerBase;
  productInCartUpdateDto: ProductInCartUpdateDto = {
    id: '',
    cartId: '',
    productId: '',
  };
  subTotal=0;
  constructor(private productService: ProductsService,private router: Router) {}

  ngOnInit(): void {
    this.getUserCartId();
  }


  fillUserCart() {
    this.productService.getProductsByCartId(this.cartId).subscribe({
      next: (products) => {
        this.productsInCartReadDto = products;
        this.productsInCartReadDto.forEach(
          (element) =>
            (element.product.totalPrice =
              element.quantity * element.product.unitPrice)
        );
      },
      error: (err) => {
        alert(err.error);
        console.log(err);
      },
    });
  }

  getUserCartId() {
    this.productService.getCartByUserId().subscribe({
      next: (cart) => {
        this.cartId = cart.id;
        this.fillUserCart();
      },
      error: (err) => {
        alert(err.error);
        console.log(err);
      },
    });
  }

  quantityChanged(productId: any, quantity: any) {
    this.productService
      .GetProductInCartIdByCartIdAndProductId(this.cartId, productId)
      .subscribe({
        next: (id) => {
          this.productInCartUpdateDto = {
            id: id,
            cartId: this.cartId,
            productId: productId,
            quantity: quantity,
          };
          this.productService
            .updateQuantity(this.productInCartUpdateDto, id)
            .subscribe({
              next: (productInCartReadDto) => {
                this.productService.getProductById(productId).subscribe({
                  next: (product) => {
                    this.productsInCartReadDto.find(
                      (i) => i.product.id == product.id
                    )!.product.totalPrice = quantity * product.unitPrice;
                  },
                  error: (err) => {
                    alert(err.error);
                    console.log(err);
                  },
                });
              },
              error: (err) => {
                alert(err.error.message);
                console.log(err);
              },
            });
        },
        error: (err) => {
          alert(err.error);
          console.log(err);
        },
      });
  }

  deleteProductFromCart(productId: any) {
    this.productService
      .GetProductInCartIdByCartIdAndProductId(this.cartId, productId)
      .subscribe({
        next: (productInCartId) => {
          this.productService.deleteProductFromCart(productInCartId).subscribe({
            next: (product) => {
              this.fillUserCart();
            },
            error: (err) => {
              alert(err.error);
              console.log(err);
            },
          });
        },
        error: (err) => {
          alert(err.error);
          console.log(err);
        },
      });
  }

  updateCart(){
    this.subTotal=0;
    this.productsInCartReadDto.forEach(
      (element) =>
        (this.subTotal+=
          element.product.totalPrice)
    );

  }

  NavigateToCheckOut(){
    this.router.navigate(['home/checkOut'])
  }
}
