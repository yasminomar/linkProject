import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Modules/auth/auth.service';
import { OrderWriteDto } from '../Models/order.models';
import { ProductsService } from '../ProductService/Products.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  cartId: string = '';
  orderWriteDto:OrderWriteDto={
    cartId:'09c2eaf0-8b2b-4e8b-9f69-f3a40210094c',
    ShipmentAddress:'',
    paymentMethod:''
  }

  constructor(private productService: ProductsService,private router: Router,private auth: AuthService) { }

  ngOnInit(): void {
    this.getUserCartId()
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
  CreateOrder(shipmentAddress:string,paymentMethod:string){
    this.orderWriteDto.cartId=this.cartId;
    this.orderWriteDto.ShipmentAddress=shipmentAddress;
    this.orderWriteDto.paymentMethod=paymentMethod;
    this.productService.CreateOrder(this.orderWriteDto).subscribe({
      next:(p)=>{
        this.router.navigate(['home/order'])
      },
      error: (err) => {
        alert(err.error);
        console.log(err);
      }
    })
   
  
    
  }
}
