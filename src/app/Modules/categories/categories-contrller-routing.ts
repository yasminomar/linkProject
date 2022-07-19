
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminService } from "../core/AdminGuard/AdminGuard.service";
import { AuthGuardService } from "../core/authGuard/auth-guard.service";
import { CategoriesControllerComponent } from "./categories-controller.component";



const routes:Routes=[{
  path:'',component:CategoriesControllerComponent ,canActivate:[AdminService],children:[ 
   {path:'controller',component:CategoriesControllerComponent,canActivate:[AdminService]}]
}]

@NgModule({

    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class CategoriesControllerRouting{}




