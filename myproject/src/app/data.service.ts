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

  openpaper(d):any{
    console.log(d);
    return this.http.post('http://localhost:3000/open-paper',d);
  }

  showpaperdetail(d):any{
    console.log(d);
    // alert(JSON.stringify(d));
    return this.http.post('http://localhost:3000/show-paper-detail',d);
  }

  dltvalue(d):any{
    console.log(d);
    // alert(JSON.stringify(d));
    return this.http.post('http://localhost:3000/delete-paper-detail',d);
  }

  updatepaperlst(d):any{
    alert(JSON.stringify(d));
    console.log(d);
    return this.http.post('http://localhost:3000/update-paper-last',d);
  }

  dltext(d):any{
    alert(JSON.stringify(d));
    console.log(d);
    return this.http.post('http://localhost:3000/delete-paper',d);
  }

  openjoinpaper(d):any{
    alert(JSON.stringify(d));
    console.log(d);
    return this.http.post('http://localhost:3000/open-join-paper',d);
  }

  jointestdetail(d):any{
    alert(JSON.stringify(d));
    console.log(d);
    return this.http.post('http://localhost:3000/join-test-detail',d);
  }

  dltqbank(d):any{
    alert(JSON.stringify(d));
    console.log(d);
    return this.http.post('http://localhost:3000/delete-q-bank',d);
  }

  showqdetail(d):any{
    console.log(d);
     alert(JSON.stringify(d));
    return this.http.post('http://localhost:3000/show-q-detail',d);
  }

  saveanswer(d):any{
    console.log(d);
     alert(JSON.stringify(d));
    return this.http.post('http://localhost:3000/save-answer',d);
  }

  showresult(d):any{
    console.log(d);
     alert(JSON.stringify(d));
    return this.http.post('http://localhost:3000/show-result',d);
  }

}

