import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-viewallresult',
  templateUrl: './viewallresult.component.html',
  styleUrls: ['./viewallresult.component.css']
})
export class ViewallresultComponent implements OnInit {
examiner;
examsubject;
quesid;
subname;
id;
obj;
secretkey:string='Secret@123';
  constructor(private route:ActivatedRoute,private ds:DataService) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((d)=>{
      this.id=d.get("x");
      let bytes = CryptoJS.AES.decrypt(this.id,this.secretkey);
      this.obj =JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      this.examiner=this.obj.examiner;
      this.examsubject=this.obj.subname;
    })

    this.ds.viewallresult({examiner:this.examiner,examsubject:this.examsubject,examinerid:localStorage.getItem('id')}).subscribe((response)=>{

      if(response.status=="ok"){
       this.quesid=response.data;
      }else{
        alert(response.data);
      }
    })

  }

}
