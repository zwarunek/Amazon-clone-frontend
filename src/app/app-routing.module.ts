import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./_helpers";
import {RegisterComponent} from "./register/register.component";
import {CartComponent} from "./cart/cart.component";

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', redirectTo: ''},
  {path: 'account', component: RegisterComponent},
  {path: 'order-history', component: RegisterComponent},
  {path: 'order/:id', component: RegisterComponent},
  {path: 'prime-membership', component: RegisterComponent},
  {path: 'cart', component: CartComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
