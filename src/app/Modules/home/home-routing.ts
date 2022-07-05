import { MyOrdersComponent } from './Components/my-orders/my-orders.component';
import { OrderComponent } from './Components/order/order.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminService } from "../core/AdminGuard/AdminGuard.service";
import { AuthGuardService } from "../core/authGuard/auth-guard.service";
import { AdminComponent } from "./Components/Admin-home/admin.component";
import { CartComponent } from "./Components/cart/cart.component";
import { CheckOutComponent } from "./Components/check-out/check-out.component";
import { CustomerComponent } from "./Components/Customer-home/customer.component";
import { HomeComponent } from "./home.component";



const routes:Routes=[{
  path:'',component:HomeComponent
  ,children:[ 
    {path:"admin",component:AdminComponent  ,canActivate:[AdminService]}
  ,{path:'products',component:CustomerComponent,canActivate:[AuthGuardService]}
  ,{path:'cart',component:CartComponent,canActivate:[AuthGuardService]}
  ,{path:'checkOut',component:CheckOutComponent,canActivate:[AuthGuardService]}
  ,{path:'order',component:OrderComponent,canActivate:[AuthGuardService]}
  ,{path:'myOrders',component:MyOrdersComponent,canActivate:[AuthGuardService]}
]
}]

@NgModule({

    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class HomeRouting{}




