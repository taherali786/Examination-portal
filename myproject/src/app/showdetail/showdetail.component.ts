import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-showdetail',
  templateUrl: './showdetail.component.html',
  styleUrls: ['./showdetail.component.css']
})
export class ShowdetailComponent implements OnInit {
  subname;
  userid;
  quesid:any[]=[];
  a;
  isedit=false;
  isdlt=false;
  select:any[]=[];
  constructor(private route:ActivatedRoute,private ds:DataService,private router:Router) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((d)=>{
      this.subname=d.get('subname');
      this.userid=d.get('id');
    })
    
    this.ds.showquestion({userid:this.userid,subname:this.subname}).subscribe((response)=>{

      if(response.status=="ok"){
        this.quesid=response.data[0].questionid;
      }else{
        alert(response.data);
      }
    })

  }

  checked(p){
    if(this.select.indexOf(p)!=-1){
      return true;
    }
  }

  update(checked,p){
    if(checked){
      this.select.push(p);
      console.log(this.select);
    }else{
      this.select.splice(this.select.indexOf(p),1);
      console.log(this.select);
    }
  }

  choosed(){
    // alert(JSON.stringify(this.select));
    this.ds.savepaper({paper:this.select,examsubject:localStorage.getItem("examsubject"),userid:localStorage.getItem("examteacher")}).subscribe((response)=>{
      if(response.status=="ok"){
        alert(JSON.stringify(response.data));
        this.router.navigate(['/dashboard/createtest'],{queryParams:{isnext:"nextone"}});
      }else{
          alert(response.data);
      }
    })
  }

} 
