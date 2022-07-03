import { Router } from '@angular/router';
import { AuthService } from 'src/app/Modules/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../ProductService/Products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn:boolean=false;
  isAdmin : boolean = false;

  constructor(private productService: ProductsService,private auth: AuthService,private authService :AuthService,private router:Router) { }

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
    this.router.navigate(['/home/products'])
  }
  CheckAdmin(){
    const token = this.auth.getToken();

    const tokenInfo = this.auth.getDecodedAccessToken(token!);
    if(tokenInfo["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == "Admin"){
      this.isAdmin = true;

    }
  }

}
