import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';


@Component({
  selector: 'app-showpaperdetail',
  templateUrl: './showpaperdetail.component.html',
  styleUrls: ['./showpaperdetail.component.css']
})
export class ShowpaperdetailComponent implements OnInit {
  examiner;
  examsubject;
  paperquesid;
  paperid;
  resultset;
  privacyset;
  timerset;
  select:any[]=[];
  constructor(private route:ActivatedRoute,private ds:DataService,private router:Router) { 
  }

  ngOnInit(): void {

    this.route.queryParamMap.subscribe((d)=>{
      this.examiner=d.get("examiner");
      localStorage.setItem('subjectteacher',this.examiner);
      alert(localStorage.getItem('subjectteacher'));
      this.examsubject=d.get("examsubject");
    })


    this.ds.showpaperdetail({userid:localStorage.getItem('id'),examiner:this.examiner,examsubject:this.examsubject}).subscribe((response)=>{

      if(response.status=="ok"){
        this.paperquesid=response.data[0].paper;
        this.paperid=response.data[0]._id;
        console.log(this.paperquesid);
        localStorage['paperques']=JSON.stringify(this.paperquesid);

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

  dltvalue(){
    for(var i=0;i<this.select.length;i++){
     // alert(JSON.stringify(this.select[i].option));
      this.ds.dltvalue({question:this.select[i].question,answer:this.select[i].answer,option:this.select[i].option,paperid:this.paperid}).subscribe((response)=>{
        if(response.status=="ok"){
           // alert(JSON.stringify(response.data));
            this.ds.showpaperdetail({userid:localStorage.getItem('id'),examiner:this.examiner,examsubject:this.examsubject}).subscribe((response)=>{

              if(response.status=="ok"){
                this.paperquesid=response.data[0].paper;
                this.paperid=response.data[0]._id;
                console.log(this.paperquesid);
                localStorage['paperques']=JSON.stringify(this.paperquesid);
        
              }else{
                alert(response.data);
              }
            })
        
        }else{
          alert(response.data);
        }
      })
    }
  }

  addmore(){
    this.router.navigate(['/dashboard/showdetail'],{queryParams:{subname:this.examsubject,examiner:this.examiner,uid:this.paperid}});
  }

}
