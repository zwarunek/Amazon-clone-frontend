import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppComponent} from "../app.component";
import {AuthenticationService} from "../_services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  quantityOptions: any[];
  totalPrice: number = 0;

  constructor(private http: HttpClient, public app: AppComponent, private auth: AuthenticationService, public router: Router) {
    app.loadingAdd()
  }

  ngOnInit(): void {
    this.getCartItems();
    this.quantityOptions = [
      {name: 1},
      {name: 2},
      {name: 3},
      {name: 4},
      {name: 5},

    ]
  }
  getCartItems(){
    this.http.get<any>("http://localhost:4200/api/fetchCartItems", {params: {accountId: this.auth.currentUserValue.accountId}}).subscribe(response =>{
      this.cartItems = JSON.parse(response.data);
      console.log(this.cartItems)
      for(let index of this.cartItems){
        index.quantity = {name: index.quantity}
      }
      this.getTotalPrice()
      this.app.loadingRemove()
    });
  }

  removeCartItem(cartItemId){
    this.http.post<any>("http://localhost:4200/api/removeCartItem", {cartItemId: cartItemId}).subscribe(response =>{
      this.app.loadingRemove()
      window.location.reload()
    });
  }
  changeQuantityCartItem(cartItemId, newQuantity){
    this.http.patch<any>("http://localhost:4200/api/changeQuantityCartItem", {cartItemId: cartItemId, newQuantity: newQuantity.name}).subscribe(response =>{
      this.app.loadingRemove()
      window.location.reload()
    });
  }
  updateCart(cartItem: any){
    this.app.loadingAdd()
    this.http.post<any>("http://localhost:4200/api/addToCart", {accountId: this.auth.currentUserValue.accountId,cartItemId: cartItem.cartItemId,  productId: Number(cartItem.cartItemId), quantity: Number(cartItem.quantity.name), price: cartItem.price}).subscribe(response => {
      this.totalPrice = 0;
      this.getCartItems()
    });
  }

  getTotalPrice() {
    for(let index of this.cartItems){
      this.totalPrice += index.price * index.quantity.name
    }

  }
}
