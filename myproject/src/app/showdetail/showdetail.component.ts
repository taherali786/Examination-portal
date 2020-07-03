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
  examiner;
  uid;
  examsubject;
  constructor(private route:ActivatedRoute,private ds:DataService,private router:Router) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((d)=>{
      this.examsubject=d.get('subname');
      alert(this.examsubject);
      this.examiner=d.get('examiner');
      alert(this.examiner);
      this.uid=d.get('uid');
      alert(this.uid);
    })

    // this.ds.showquestion({userid:localStorage.getItem('id'),subname:this.examsubject}).subscribe((response)=>{

    //   if(response.status=="ok"){
    //     this.quesid=response.data[0].questionid;
    //   }else{
    //     alert("Your Question Bank is Not Available We rediredting.. you to Question Bank Page ");
    //     this.router.navigate(['/dashboard/createqbank']);
    //   }
    // })
    
    if(this.examiner==null){
    this.ds.showquestion({userid:localStorage.getItem('id'),subname:this.examsubject}).subscribe((response)=>{

      if(response.status=="ok"){
        this.quesid=response.data[0].questionid;
      }else{
        alert(response.data);
      }
    })
  }else{
    this.ds.showquestion({userid:localStorage.getItem('id'),subname:this.examsubject}).subscribe((response)=>{

      if(response.status=="ok"){
        this.quesid=response.data[0].questionid;
      }else{
        alert("Your Question Bank is Not Available We rediredting.. you to Question Bank Page ");
        this.router.navigate(['/dashboard/createqbank']);
      }
    })
  }

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
    if(this.examiner==null){
        alert("inserr block");
      this.ds.savepaper({paper:this.select,examsubject:localStorage.getItem("examsubject"),examiner:localStorage.getItem("examteacher"),userid:localStorage.getItem('id')}).subscribe((response)=>{
        if(response.status=="ok"){
          alert(JSON.stringify(response.data));
          this.router.navigate(['/dashboard/createtest'],{queryParams:{isnext:"nextone"}});
        }else{
            alert(response.data);
        }
      })
    }else{
      alert("update block");
      for(var i=0;i<this.select.length;i++){
      this.ds.updatepaperlst({paper:this.select[i],examsubject:this.examsubject,userid:this.uid}).subscribe((response)=>{
        if(response.status=="ok"){
          alert(JSON.stringify(response.data));
          this.router.navigate(['/dashboard/showpaperdetail'],{queryParams:{examsubject:this.examsubject,examiner:localStorage.getItem('subjectteacher')}});
        }else{
            alert(response.data);
        }
      })
    }
    }
    
  }

} 
