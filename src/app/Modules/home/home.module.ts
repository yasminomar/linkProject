import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './Components/Admin-home/admin.component';
import { CustomerComponent } from './Components/Customer-home/customer.component';
import { HomeRouting } from './home-routing';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './Components/header/header.component';
import { CartComponent } from './Components/cart/cart.component';
import {NgxPaginationModule} from 'ngx-pagination'; 


@NgModule({
  declarations: [
    HomeComponent,
    AdminComponent,
    CustomerComponent,
    HeaderComponent,
    CartComponent
  ],
  imports: [
    NgxPaginationModule,
    HomeRouting,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FormsModule ,
    MatIconModule 
  ]})
export class HomeModule { }
