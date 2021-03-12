import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../../_services";

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.css']
})
export class PaymentMethodsComponent implements OnInit {
  paymentMethods: any[];

  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.getAllPaymentMethods();
  }
  getAllPaymentMethods(){
    this.http.get<any>("http://localhost:4200/api/getAllPaymentMethods",
      {params: {accountId: this.auth.currentUserValue.accountId}}).subscribe(response =>{
      console.log(this.paymentMethods);
      this.paymentMethods = JSON.parse(response.data)
      console.log(this.paymentMethods);
    })
  }


  getLastFourDigets(cardNumber: any) {
    let temp = cardNumber.toString().substring(cardNumber.toString().length - 4);
    console.log(temp)
    return temp
  }

  makeFavorite(PMID: any) {
    this.http.post<any>("http://localhost:4200/api/setPaymentMethodFavorite", {accountId: this.auth.currentUserValue.accountId, PMID: PMID}).subscribe(response =>{
      if(response.status == 200){
        window.location.reload();
      }
    })
  }
}
