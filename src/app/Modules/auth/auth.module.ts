import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './Component/Login/login.component';
import { RegisterComponent } from './Component/Register/register.component';
import { AuthRouting } from './auth-routing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
    ],
  imports: [
    CommonModule,
    AuthRouting,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AuthModule { }
