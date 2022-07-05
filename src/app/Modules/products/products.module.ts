import { ProductsControllerRouting } from './products-contrller-routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsControllerComponent } from './products-controller.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatIconModule } from '@angular/material/icon';
import { HomeModule } from '../home/home.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { HeaderComponent } from '../home/Components/header/header.component';



@NgModule({
  declarations: [
    ProductsControllerComponent,
   // HeaderComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    MatIconModule ,
    ProductsControllerRouting,
    NgxSmartModalModule.forChild(),
    HomeModule,
    ReactiveFormsModule,
    FormsModule 

  ]
})
export class ProductsModule { }
