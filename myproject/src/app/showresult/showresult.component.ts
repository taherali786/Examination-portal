import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-showresult',
  templateUrl: './showresult.component.html',
  styleUrls: ['./showresult.component.css']
})
export class ShowresultComponent implements OnInit {
  ishide;
  ishide2=false;
  isshow=true;
post;
encryted:string;
secretkey:string='Secret@123';
  constructor(private ds:DataService,private router:Router) { }

  ngOnInit(): void {

    this.ds.showresult({userid:localStorage.getItem('id')}).subscribe((response)=>{
      if(response.status=="ok"){
          this.post=response.data;

      }else{
         alert(response.data);
      }
    })
  }

  goto()
  {
    //this.router.navigate(['/dashboard/addnewque'],{queryParams:{ishide:"true"}});
  }
  gotonew()
  {
    //this.router.navigate(['/dashboard/addnewque']);
  }
  
  showtext(title:string)
  {
      // if(title!=""){
      //  this.router.navigate(['/dashboard/showdetail'],{queryParams:{examsubject:title,examiner:title2}});
      // }else{
      //   alert("error");
      // }
  }
   
  edittext(title:string,title2:string)
  {
    
    if(title!=""){
      var obj={id:title,paperid:title2};
      var x=CryptoJS.AES.encrypt(JSON.stringify(obj),this.secretkey).toString();
      this.router.navigate(['/dashboard2/resultcheck'],{queryParams:{x}});
     }else{
       alert("error");
     }
    
  }
  

}
