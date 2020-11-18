import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-showqbankdetail',
  templateUrl: './showqbankdetail.component.html',
  styleUrls: ['./showqbankdetail.component.css']
})
export class ShowqbankdetailComponent implements OnInit {
id;
subname;
userid;
quesid:any[]=[];
a;
isedit=false;
isdlt=false;
select:any[]=[];
examiner;
uid;
examsubject;
secretkey:string='Secret@123';
obj;
  constructor(private route:ActivatedRoute,private router:Router,private ds:DataService) { }

  ngOnInit(): void {

    this.route.queryParamMap.subscribe((d)=>{
      this.id=d.get("x");
      let bytes = CryptoJS.AES.decrypt(this.id,this.secretkey);
      this.obj =JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
     
    })
    this.ds.showqbankdetail({id:this.obj.id}).subscribe((response)=>{

      if(response.status=="ok"){
        this.quesid=response.data[0].questionid;
        this.subname=response.data[0].subname;
      }else{
        alert(response.data);
      }
    })
  }

 
}
