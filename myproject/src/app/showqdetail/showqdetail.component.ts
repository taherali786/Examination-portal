import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-showqdetail',
  templateUrl: './showqdetail.component.html',
  styleUrls: ['./showqdetail.component.css']
})
export class ShowqdetailComponent implements OnInit {
  examiner;
  examsubject;
  paperquesid;
  paperid;
  resultset;
  privacyset;
  timerset;
  select:any[]=[];
  constructor(private route:ActivatedRoute,private ds:DataService) { }

  ngOnInit(): void {

    this.route.queryParamMap.subscribe((d)=>{
      this.examiner=d.get("examiner");
      this.examsubject=d.get("subname");
    })

    this.ds.showqdetail({userid:localStorage.getItem('id'),examiner:this.examiner,subname:this.examsubject}).subscribe((response)=>{

      if(response.status=="ok"){
        this.paperquesid=response.data[0].questionid;
        this.paperid=response.data[0]._id;
        console.log(this.paperquesid);
        console.log(this.paperid);
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
    // for(var i=0;i<this.select.length;i++){
    //  // alert(JSON.stringify(this.select[i].option));
    //   this.ds.dltvalue({question:this.select[i].question,answer:this.select[i].answer,option:this.select[i].option,paperid:this.paperid}).subscribe((response)=>{
    //     if(response.status=="ok"){
    //         alert(JSON.stringify(response.data));
    //         window.location.reload(true);
    //     }else{
    //       alert(response.data);
    //     }
    //   })
    // }
  }

  addmore(){
   // this.router.navigate(['/dashboard/showdetail'],{queryParams:{subname:this.examsubject,examiner:this.examiner,uid:this.paperid}});
  }

}
