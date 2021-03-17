import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AppComponent} from "../app.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  private routeSub: Subscription;
  products: any[] = [];
  k: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, public app: AppComponent) { }

  ngOnInit(): void {
    this.app.loadingAdd()
    this.routeSub = this.route.queryParams.subscribe(params => {
      this.k = params['k']
      console.log(this.k)
      this.searchProducts();
    });
  }
  searchProducts(){
    this.http.get<any>('http://localhost:4200/api/searchProducts', {params: {k: this.k}}).subscribe(response =>{
      this.products = response.data;
      console.log(this.products)
      this.app.loadingRemove()
    })
  }
}
