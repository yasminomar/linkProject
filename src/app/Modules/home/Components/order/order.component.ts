import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Modules/auth/auth.service';
import { environment } from 'src/environments/environment';
import { ProductInCartReadDto } from '../Models/cart.model';
import { OrderReadDto } from '../Models/order.models';
import { ProductsService } from '../ProductService/Products.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  cartId: string = '';
  productsInCartReadDto: ProductInCartReadDto[] = [];
  orderReadDto: OrderReadDto|null =null;
  subTotal=0;
  ServerBase = environment.ServerBase;

  constructor(private productService: ProductsService,
    private router: Router,
    private auth: AuthService) { }
  ngOnInit(): void {
    this.getUserCartId();
  }
  fillUserCart() {
    this.productService.getProductsByCartId(this.cartId).subscribe({
      next: (products) => {
        this.productsInCartReadDto = products;
        this.productsInCartReadDto.forEach((element) =>(element.product.totalPrice =element.quantity * element.product.unitPrice));
        this.productService.getOrderByCartId(this.cartId).subscribe({
          next: (order) => {
            this.orderReadDto=order;
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
  getUserCartId() {
    this.productService.getCartByUserId().subscribe({
      next: (cart) => {
        this.cartId = cart.id;
        console.log("yasmine",cart);
        this.fillUserCart();
      },
      error: (err) => {
        alert(err.error);
        console.log(err);
      },
    });
  }
  SubmitOrder(){
    this.productService.DeleteProductInCartByCartId(this.cartId).subscribe({
      next: (productsInCart) => {
        console.log(productsInCart);
        productsInCart.forEach((productInCart)=>(
          this.productService.UpdateProductQuantity(productInCart.product.id,productInCart.quantity).subscribe({
            next: (product) => {
            },
            error: (err) => {
              alert(err.error);
              console.log(err);
            }
          })
          ));
        this.productService.DeleteOrderByCartId(this.cartId).subscribe({
          next: (order) => {
            this.router.navigate(['home/products']);
          },
          error: (err) => {
            alert(err.error);
            console.log(err);
          }
        });
      },
      error: (err) => {
        alert(err.error);
        console.log(err);
      }
    });
  }
}
