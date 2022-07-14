import { CartReadDto, ProductInCartWriteDto } from './../Models/cart.model';
import { ProductParameters, ProductReadDto } from './../Models/product.model';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
  products: ProductReadDto[] = [];
  isAdmin : boolean = false;
  productsReadDto: ProductReadDto[] = [];
  ServerBase = environment.ServerBase;
  productInCartWriteDto:ProductInCartWriteDto={
    cartId:'09c2eaf0-8b2b-4e8b-9f69-f3a40210094c',
    productId:'09c2eaf0-8b2b-4e8b-9f69-f3a40210094c'
  }

  constructor(private productService: ProductsService,private router: Router,private auth: AuthService) {}

  ngOnInit(): void {
    this.fillUserCart();
    this.GetProducts(1);
  

  }


  GetProducts(page:number){
    var productParameters:ProductParameters={pageNumber:page};
    this.productService.getAllProducts(productParameters).subscribe({
      next: (products) => {
        this.productsReadDto=products.products.flatMap(p=>p.products);
        this.totalCount=products.totalCount;
        this.currentPage=page;
      },
      error: (err) => {
        alert(err.error);
        console.log(err);
      },
    });
  }



  GetFilteredProducts(page:number,productName:string){
    var productParameters:ProductParameters={pageNumber:page};
    this.productService.getFilteredProducts(productParameters,productName).subscribe({
      next: (products) => {
        this.productsReadDto=products.products.flatMap(p=>p.products);
        console.log("yas", this.productsReadDto);
        this.totalCount= this.productsReadDto.length;
        this.currentPage=page;
      },
      error: (err) => {
        alert(err.error);
        console.log(err);
      },
    });
  }


  GetDataToSendToBack() {
    return this.productsReadDto.map((p) => {
      return { id: p.id, productCount: p.productCount };
    });
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/auth/login']);
    this.isAdmin = false;
  }


  AddToCart(e:any,prod:ProductReadDto){
 
    this.productInCartWriteDto.cartId=this.cart?.id;
    this.productInCartWriteDto.productId=e.id;
    this.productService.AddProductToCart(this.productInCartWriteDto).subscribe({
      next:(p)=>{
        this.fillUserCart();
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
    this.GetFilteredProducts(1,productName);
  }
}
