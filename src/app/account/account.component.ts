import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../_services";
import {BehaviorSubject} from "rxjs";
import {map} from "rxjs/operators";
import {Header} from "primeng/api";
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  currentUserSubject: BehaviorSubject<any>;
  currentUser: any;
  cards: any[];
  primeVisible: boolean;
  constructor(private http: HttpClient,private router: Router, private authService: AuthenticationService) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.cards = [{
      Name: 'Your Orders',
      Desc: 'View the orders you have made',
      routerLink: '/order-history',
      img: 'https://images-na.ssl-images-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/order._CB660668735_.png'
    },
      {
        Name: 'Prime',
        Desc: 'View subscription',
        img: 'https://images-na.ssl-images-amazon.com/images/G/01/x-locale/cs/ya/images/Prime_clear-bg._CB423472251_.png'
      },
      {
        Name: 'Login & Security',
        Desc: 'Edit login, and name',
        routerLink: '/account/login-security',
        img: 'https://images-na.ssl-images-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/security._CB659600413_.png'
      },
      {
        Name: 'Your Payments',
        Desc: 'Manage payment methods and settings',
        routerLink: '/account/payment-methods',
        img: 'https://images-na.ssl-images-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/payment._CB660668735_.png'
      },
      {
        Name: 'Your Delivery Addresses',
        Desc: 'View and manage your delivery addresses',
        routerLink: '/account/addresses',
        img: 'https://images-na.ssl-images-amazon.com/images/G/01/x-locale/cs/help/images/gateway/self-service/digital_devices._CB660668735_.png'
      },
      {
        Name: 'skip'
      }];
  }

  handleClick(card: any) {
    if(card.routerLink != null){
      this.router.navigateByUrl(card.routerLink);
    }
    else{
      switch (card.Name){
        case 'Prime':
          this.primeVisible = true;
          break;
      }
    }
  }

  changeMembership() {
    this.http.post<any>("http://localhost:4200/api/changePrimeMembership", { member: this.currentUser.primeMember, accountId: this.currentUser.accountId }).subscribe(response =>{
      response.data.token = this.currentUserSubject.value.token;
      localStorage.setItem('currentUser', JSON.stringify(response.data));
      this.currentUserSubject.next(response.data);
      this.currentUser = this.currentUserSubject.value;
      location.reload();
    });
  }
}
