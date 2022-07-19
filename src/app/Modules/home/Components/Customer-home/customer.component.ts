import { CartReadDto, ProductInCartWriteDto } from './../Models/cart.model';
import {  ProductReadDto } from './../Models/product.model';
import { Component, OnInit ,LOCALE_ID, Inject} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Modules/auth/auth.service';
import { environment } from 'src/environments/environment';
import { ProductsService } from '../ProductService/Products.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit  {
  totalCount=1;
  currentPage=1;
  cart:CartReadDto|null=null;
  isAdmin : boolean = false;
  productsReadDto: ProductReadDto[] = [];
  ServerBase = environment.ServerBase;
  productInCartWriteDto:ProductInCartWriteDto={
    cartId:'09c2eaf0-8b2b-4e8b-9f69-f3a40210094c',
    productId:'09c2eaf0-8b2b-4e8b-9f69-f3a40210094c'
  }

  constructor(private productService: ProductsService,private router: Router,private auth: AuthService,@Inject(LOCALE_ID) public locale: string  ) {

  }

  ngOnInit(): void {
    this.fillUserCart();
    this.GetProducts();
    this.CheckAdmin();

  }


  GetProducts(){
    this.productService.getAllProductsToHomePage().subscribe({
      next: (products) => {
        this.productsReadDto=products;
      },
      error: (err) => {
        alert(err.error);
        console.log(err);
      },
    });
  }

  AddToCart(e:any,prod:ProductReadDto){
 
    this.productInCartWriteDto.cartId=this.cart?.id;
    this.productInCartWriteDto.productId=e.id;
    this.productService.AddProductToCart(this.productInCartWriteDto).subscribe({
      next:(p)=>{
      },
      error: (err) => {
        alert(err.error);
        console.log(err);
      }
    })
  }

  isProductAdded(product:ProductReadDto):boolean{
    return this.cart?.products.map(p=>p.product.id).includes(product.id)??false;
  }

  fillUserCart(){
    this.productService.getCartByUserId().subscribe({
      next:(cart)=>{
        this.cart=cart;
      },
      error: (err) => {
        alert(err.error);
        console.log(err);
      }
    });
  }

  filterWithProductName(productName:string){
    this.productService.getAllProductsToHomePage().subscribe({
      next: (products) => {
        this.productsReadDto=products;
        this.productsReadDto=this.productsReadDto.filter(p=>p.quantity!>0&&p.englishName.toLocaleLowerCase().includes(productName.toLocaleLowerCase()));
      },
      error: (err) => {
        alert(err.error);
        console.log(err);
      },
    });  
  }

  CheckAdmin(){
    const token = this.auth.getToken();
    const tokenInfo = this.auth.getDecodedAccessToken(token!);
    if(tokenInfo["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == "Admin"){
      this.isAdmin = true;

    }
  }
}
