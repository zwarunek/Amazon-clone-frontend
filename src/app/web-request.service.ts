import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://api.zacharywarunek.com'
  }

  get(uri: string) {
    return this.http.get(uri);
  }
  post(uri: string, payload: Object, headers: any) {
    return this.http.post(`${uri}`, payload, headers);

  }
  patch(uri: string, payload: Object) {
    return this.http.patch(uri, payload);
  }
  delete(uri: string) {
    return this.http.delete(uri);
  }

}
