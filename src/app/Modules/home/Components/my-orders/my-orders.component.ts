import { NgxSmartModalService } from 'ngx-smart-modal';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Modules/auth/auth.service';
import { environment } from 'src/environments/environment';
import { ProductInCartReadDto } from '../Models/cart.model';
import { OrderHistoryReadDto } from '../Models/order.models';
import { ProductsService } from '../ProductService/Products.service';


@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  cartId: string = '';
  counter=1;
  orderHistoryReadDto:OrderHistoryReadDto[]=[];
  ServerBase = environment.ServerBase;

  constructor(private productService: ProductsService,private router: Router,private auth: AuthService,private ngxSmartModalService: NgxSmartModalService){ }

  ngOnInit(): void {
    this.getUserCartId();
    this.fillUserOrders();
  }
  fillUserOrders() {
    this.productService.getOrdersByUserId().subscribe({
      next: (orders) => {
        console.log(orders)
        this.orderHistoryReadDto=orders;
        console.log("yas",this.orderHistoryReadDto);
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
      },
      error: (err) => {
        alert(err.error);
        console.log(err);
      },
    });
  }


  openOrderDetailes(){
    this.ngxSmartModalService.getModal('openOrderDetailesModal').open();
  }
  
}
