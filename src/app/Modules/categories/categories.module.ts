import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatIconModule } from '@angular/material/icon';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { HomeModule } from '../home/home.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriesControllerComponent } from './categories-controller.component';
import { CategoriesControllerRouting } from './categories-contrller-routing';

@NgModule({
  declarations: [
    CategoriesControllerComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    MatIconModule ,
    CategoriesControllerRouting,
    NgxSmartModalModule.forChild(),
    HomeModule,
    ReactiveFormsModule,
    FormsModule 

  ]
})
export class CategoriesModule { }
