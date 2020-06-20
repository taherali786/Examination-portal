import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }


  getPosts():any
  {
    return this.http.get('url');
  }

  signup(d):any
  {
    alert(JSON.stringify(d));
    return this.http.post('http://localhost:3000/sign-up',d);
  }

  signin(d):any{
    return this.http.post('http://localhost:3000/sign-in',d);
  }
}
