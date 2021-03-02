import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any[]>(`http://localhost:8080/users`);
  }

  register(user) {
    return this.http.post<any>(`http://localhost:8080/register`, user).pipe(map(response => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      return response;
    }));
  }

  delete(id) {
    return this.http.delete(`http://localhost:8080/users/${id}`);
  }
}
