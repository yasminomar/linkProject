import { Router } from '@angular/router';
import { AuthService } from 'src/app/Modules/auth/auth.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductsService } from '../ProductService/Products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn:boolean=false;
  isAdmin : boolean = false;
  searchValue='';
  @Output() searchValueChanged:EventEmitter<string>;

  constructor(private productService: ProductsService,private auth: AuthService,private authService :AuthService,private router:Router) { 
    this.searchValueChanged=new EventEmitter<string>();
  }

  ngOnInit(): void {
this.isLoggedIn=this.authService.isLoggedIn()
this.CheckAdmin();

  }
  logOut(){
    this.authService.logout();
    this.isLoggedIn=false;

  }


  NavigateToAdmin(){

    this.router.navigate(['/home/admin']);

  }



  GoToCart(){
    this.productService.getCartByUserId().subscribe({
      next: (cart) => {
        console.log(cart);
        this.router.navigate(['/home/cart'])
      },
      error: (err) => {
        alert(err.error);
        console.log(err);
      },
    });

  }
  GoToProducts(){
    this.router.navigate(['/home/products']);
  }
  GoToOrders(){
    this.router.navigate(['/home/myOrders']);

  }
  CheckAdmin(){
    const token = this.auth.getToken();

    const tokenInfo = this.auth.getDecodedAccessToken(token!);
    if(tokenInfo["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == "Admin"){
      this.isAdmin = true;

    }
  }

  Search(productName:string){

    this.searchValue=productName;
    this.searchValueChanged.emit(this.searchValue);
  }

}
