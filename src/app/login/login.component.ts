import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {WebRequestService} from "../web-request.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  response: string;

  constructor(private http: WebRequestService) {
  }

  ngOnInit(): void {

  }
  public getUsers() {
    this.http.get('http://localhost:8080/users').subscribe((response: string) => {
      this.response = response;
      document.getElementById('user').innerHTML = this.response;
    });
  }

}
