import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminService } from "../core/AdminGuard/AdminGuard.service";
import { AuthGuardService } from "../core/authGuard/auth-guard.service";
import { ProductsControllerComponent } from './products-controller.component';



const routes:Routes=[{
  path:'',component:ProductsControllerComponent  ,canActivate:[AdminService],children:[ 
   {path:'controller',component:ProductsControllerComponent,canActivate:[AdminService]}]
}]

@NgModule({

    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class ProductsControllerRouting{}




