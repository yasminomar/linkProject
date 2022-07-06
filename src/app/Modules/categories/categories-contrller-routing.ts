
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../core/authGuard/auth-guard.service";
import { CategoriesControllerComponent } from "./categories-controller.component";



const routes:Routes=[{
  path:'',component:CategoriesControllerComponent,children:[ 
   {path:'controller',component:CategoriesControllerComponent,canActivate:[AuthGuardService]}]
}]

@NgModule({

    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class CategoriesControllerRouting{}




