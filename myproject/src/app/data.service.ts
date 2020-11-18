import { Injectable } from '@angular/core'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
//const io=require('socket.io-client');
@Injectable({
  providedIn: 'root',
})

export class DataService {
 
  baseURL='http://3.134.86.110';
  constructor(private http:HttpClient) { }

  
  getPosts():any
  {
    return this.http.get('url');
  }

  signup(d):any
  {
    return this.http.post(this.baseURL+'/sign-up',d);
  }

  signin(d):any{
    return this.http.post(this.baseURL+'/sign-in',d);
  }

  savesubject(d):any{

    return this.http.post(this.baseURL+'/save-subjectinfo',d);
  }

  saveque(d):any{
    // alert(JSON.stringify(d));
    //console.log(d);
    return this.http.post(this.baseURL+'/save-question',d);
  }

  savesubmitlast(d):any{
    // alert(JSON.stringify(d));
    //console.log(d);
    return this.http.post(this.baseURL+'/save-submitlast',d);
  }

  savetst(d):any
  {
    // alert(JSON.stringify(d));
    //console.log(d);
    return this.http.post(this.baseURL+'/save-test',d);
  }
  
  openfile(d):any{
    //console.log(d);
    return this.http.post(this.baseURL+'/open-file',d);
  }

  showquestion(d):any{
    // //console.log(d);
    // alert(JSON.stringify(d));
    return this.http.post(this.baseURL+'/show-question',d);
  }
  showallquestionpaper(d):any{
    // //console.log(d);
    // alert(JSON.stringify(d));
    return this.http.post(this.baseURL+'/show-all-questionpaper',d);
  }

  savepaper(d):any{
    return this.http.post(this.baseURL+'/save-paper',d);
  }

  savepaperlst(d):any{
    return this.http.post(this.baseURL+'/save-paper-last',d);
  }

  openpaper(d):any{
    return this.http.post(this.baseURL+'/open-paper',d);
  }

  showpaperdetail(d):any{
    // //console.log(d);
    return this.http.post(this.baseURL+'/show-paper-detail',d);
  }

  dltvalue(d):any{
    // //console.log(d);
    return this.http.post(this.baseURL+'/delete-paper-detail',d);
  }

  updatepaperlst(d):any{
    // //console.log(d);
    return this.http.post(this.baseURL+'/update-paper-last',d);
  }

  dltext(d):any{
    // //console.log(d);
    return this.http.post(this.baseURL+'/delete-paper',d);
  }

  openjoinpaper(d):any{
    // //console.log(d);
    return this.http.post(this.baseURL+'/open-join-paper',d);
  }

  jointestdetail(d):any{

    ////console.log(d);
    return this.http.post(this.baseURL+'/join-test-detail',d);
  }

  dltqbank(d):any{
    //console.log(d);
    return this.http.post(this.baseURL+'/delete-q-bank',d);
  }

  showqdetail(d):any{
    //console.log(d);
    return this.http.post(this.baseURL+'/show-q-detail',d);
  }

  saveanswer(d):any{
    //console.log(d);
    return this.http.post(this.baseURL+'/save-answer',d);
  }

  showresult(d):any{
    //console.log(d);
    return this.http.post(this.baseURL+'/show-result',d);
  }

  checkjoinpaper(d):any{
    //console.log(d);
    return this.http.post(this.baseURL+'/check-join-paper',d);
  }

  openjoinanswer(d):any{
    //console.log(d);
    return this.http.post(this.baseURL+'/open-join-answer',d);
  }

  openstudentqbank(d):any{
    return this.http.post(this.baseURL+'/open-student-qbank',d);
  }

  showqbankdetail(d):any{
    // alert(JSON.stringify(d));
    return this.http.post(this.baseURL+'/show-qbank-detail',d);
  }

  showallresult(d):any{
    //console.log(d);
    return this.http.post(this.baseURL+'/show-all-result',d);
  }

  viewallresult(d):any{
    //console.log(d);
    return this.http.post(this.baseURL+'/view-all-result',d);
  }

  updateprivacysetting(d):any{
    // alert(JSON.stringify(d));
    return this.http.post(this.baseURL+'/update-privacy-setting',d);
  }

  savequestion(d):any{
    // alert(JSON.stringify(d));
    //console.log(d);
    return this.http.post(this.baseURL+'/save-question-manually',d);
  }
  savequestionlast(d):any{
    // alert(JSON.stringify(d));
    //console.log(d);
    return this.http.post(this.baseURL+'/savequestion-last-manually',d);
  }

  savepaperlstone(d):any{
    // alert(JSON.stringify(d));
    return this.http.post(this.baseURL+'/save-paper-lastone',d);
  }

  openjoinpaperofidpass(d):any{
    //console.log(d);
    return this.http.post(this.baseURL+'/open-join-paper-idpass',d);
  }
  updateprivacy2setting(d):any{
    //console.log(d);
    return this.http.post(this.baseURL+'/update-privacy2-setting',d);
  }

  updatepaperlast(d):any{
    // alert(JSON.stringify(d));
    //console.log(d);
    return this.http.post(this.baseURL+'/updateandsave-paper-last',d);
  }

  checkschedule(d):any{
    // alert(JSON.stringify(d));
    //console.log(d);
    return this.http.post(this.baseURL+'/check-schedule',d);
  }
  checkstudentdetail(d):any{
    //alert(JSON.stringify(d));
    //console.log(d);
    return this.http.post(this.baseURL+'/check-student-detail',d);
  }
  addquestion(d):any{
    //console.log(d);
    return this.http.post(this.baseURL+'/add-questioninbank',d);
  }
  addquestionlast(d):any{
    //console.log(d);
    return this.http.post(this.baseURL+'/add-questioninbank-last',d);
  }

  showresultcheck(d):any{
    // alert(JSON.stringify(d));
    return this.http.post(this.baseURL+'/show-result-check',d);
  }
}

