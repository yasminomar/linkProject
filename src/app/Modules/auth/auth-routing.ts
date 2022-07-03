import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginRegisterAuthGuardService } from "../core/login-register-guard/login-register-auth-guard.service";
import { AuthComponent } from "./auth.component";
import { LoginComponent } from "./Component/Login/login.component";
import { RegisterComponent } from "./Component/Register/register.component";




const routes:Routes=[{
  path:'',component:AuthComponent
  ,children:[ 
      {path:"register",component:RegisterComponent}
  ,{path:'login',component:LoginComponent}
]
,canActivate:[LoginRegisterAuthGuardService]
}]

@NgModule({

    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class AuthRouting{}
