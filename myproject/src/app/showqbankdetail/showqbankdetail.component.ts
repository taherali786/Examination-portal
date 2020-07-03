import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

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
  constructor(private route:ActivatedRoute,private router:Router,private ds:DataService) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((d)=>{
      this.id=d.get("id");
    })

    this.ds.showqbankdetail({id:this.id}).subscribe((response)=>{

      if(response.status=="ok"){
        this.quesid=response.data[0].questionid;
        this.subname=response.data[0].subname;
      }else{
        alert(response.data);
      }
    })
  }

 
}
