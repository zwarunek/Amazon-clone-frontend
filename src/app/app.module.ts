import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MenubarModule} from 'primeng/menubar';
import {MenuItem, SharedModule} from 'primeng/api';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import {ErrorInterceptor, fakeBackendProvider, JwtInterceptor} from "./_helpers";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {SlideMenuModule} from 'primeng/slidemenu';
import {MenuModule} from 'primeng/menu';
import { AccountComponent } from './account/account.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrderComponent } from './order/order.component';
import { PrimeMembershipComponent } from './prime-membership/prime-membership.component';
import { BrowsingHistoryComponent } from './browsing-history/browsing-history.component';
import { CartComponent } from './cart/cart.component';
import {CardModule} from 'primeng/card';
import {PasswordModule} from 'primeng/password';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AccountComponent,
    OrderHistoryComponent,
    OrderComponent,
    PrimeMembershipComponent,
    BrowsingHistoryComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ButtonModule,
    RippleModule,
    ReactiveFormsModule,
    MenubarModule,
    SharedModule,
    InputTextModule,
    FormsModule,
    DropdownModule,
    BrowserAnimationsModule,
    SlideMenuModule,
    MenuModule,
    CardModule,
    PasswordModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},

    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
