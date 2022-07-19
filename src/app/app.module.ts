import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './Modules/auth/auth.module';
import { CoreModule } from './Modules/core/core.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './Modules/core/interceptore/interceptors.service';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { HomeModule } from './Modules/home/home.module';
import { CategoriesModule } from './Modules/categories/categories.module';
import { ProductsModule } from './Modules/products/products.module';



@NgModule({
  declarations: [
    AppComponent,
  ],

  imports: [
    NgxPaginationModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    FormsModule,
    CoreModule,
    HomeModule,
    ProductsModule,
    CategoriesModule,
    BrowserAnimationsModule

  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},{provide:HTTP_INTERCEPTORS,useClass:Interceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
