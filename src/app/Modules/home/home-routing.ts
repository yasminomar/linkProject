import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminService } from "../core/AdminGuard/AdminGuard.service";
import { AuthGuardService } from "../core/authGuard/auth-guard.service";
import { AdminComponent } from "./Components/Admin-home/admin.component";
import { CartComponent } from "./Components/cart/cart.component";
import { CustomerComponent } from "./Components/Customer-home/customer.component";
import { HomeComponent } from "./home.component";



const routes:Routes=[{
  path:'',component:HomeComponent
  ,children:[ 
    {path:"admin",component:AdminComponent  ,canActivate:[AdminService]}
  ,{path:'products',component:CustomerComponent,canActivate:[AuthGuardService]}
  ,{path:'cart',component:CartComponent,canActivate:[AuthGuardService]}
]
}]

@NgModule({

    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class HomeRouting{}




