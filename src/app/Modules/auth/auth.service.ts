import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { registerUser } from './Models/registerUser.model';
import { LoginUser } from './Models/user.model';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  baseURL: string = 'https://yasmineonlineshopping.azurewebsites.net/api/Account';


  constructor(private http:HttpClient,private router: Router){}

  login(loginUser:LoginUser){
    return this.http.post(this.baseURL+'/login',loginUser);
  }

  RegisterCustomer(newUser:registerUser){
    return this.http.post(this.baseURL+'/CustomerRegister',newUser);
    
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  isLoggedIn(){
    return !!localStorage.getItem('token');
  }

  
  getLoggedInUser(){
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
}
