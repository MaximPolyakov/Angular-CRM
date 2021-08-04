import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Api } from './api';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  
  getUsers(): Observable<any> {
    return this.http.get<any>(`${Api.users}`)
  }
}
