import { Injectable } from '@angular/core'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
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

  savesubject(d):any{
    alert(JSON.stringify(d));
    return this.http.post('http://localhost:3000/save-subjectinfo',d);
  }

  saveque(d):any{
    // alert(JSON.stringify(d));
    console.log(d);
    return this.http.post('http://localhost:3000/save-question',d);
  }

  savesubmitlast(d):any{
    // alert(JSON.stringify(d));
    console.log(d);
    return this.http.post('http://localhost:3000/save-submitlast',d);
  }

  savetst(d):any
  {
    // alert(JSON.stringify(d));
    console.log(d);
    return this.http.post('http://localhost:3000/save-test',d);
  }
  
  openfile(d):any{
    console.log(d);
    return this.http.post('http://localhost:3000/open-file',d);
  }

  showquestion(d):any{
    console.log(d);
    // alert(JSON.stringify(d));
    return this.http.post('http://localhost:3000/show-question',d);
  }

  savepaper(d):any{
    alert(JSON.stringify(d));
    return this.http.post('http://localhost:3000/save-paper',d);
  }

  savepaperlst(d):any{
    alert(JSON.stringify(d));
    return this.http.post('http://localhost:3000/save-paper-last',d);
  }
}

