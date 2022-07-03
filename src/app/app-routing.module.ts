import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'' ,pathMatch:'full',redirectTo:'/auth/login'},
  {path:'auth',loadChildren:()=> import('./Modules/auth/auth.module').then(m => m.AuthModule)},
  {path:'home',loadChildren:()=> import('./Modules/home/home.module').then(m => m.HomeModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

