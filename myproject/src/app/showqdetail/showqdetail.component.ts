import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import * as CryptoJS from 'crypto-js';

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
  id;
  ids;
  objs;
  obj;
  paper_id;
  subjectname;
  teacher;
  secretkey:string='Secret@123';
  constructor(private route:ActivatedRoute,private ds:DataService,private router:Router) { }

  ngOnInit(): void {

    this.route.queryParamMap.subscribe((d)=>{
      this.id=d.get("x");
      if(this.id!=null ||this.id!==undefined){
      let bytes = CryptoJS.AES.decrypt(this.id,this.secretkey);
      this.obj =JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      this.paper_id=this.obj.paperid;
     
      }
      // this.ids=d.get("y");
      // alert(this.ids);
      // if(this.ids!=null ||this.ids!==undefined){
      // let bytes = CryptoJS.AES.decrypt(this.id,this.secretkey);
      // this.objs =JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      // this.subjectname=this.objs.subjectname;
      // this.teacher=this.objs.teacher;
      // alert("Teacher  "+this.teacher);
      // alert("Subject Name"+this.subjectname);
      // }
    })

    this.ds.showqdetail({paperid:this.paper_id}).subscribe((response)=>{

      if(response.status=="ok"){
        this.paperquesid=response.data[0].questionid;
        this.paperid=response.data[0]._id;
        
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
     
    }else{
      this.select.splice(this.select.indexOf(p),1);
     
    }
  }

  dltvalue(){
    for(var i=0;i<this.select.length;i++){
     // alert(JSON.stringify(this.select[i].option));
      this.ds.dltvalue({question:this.select[i].question,answer:this.select[i].answer,option:this.select[i].option,paperid:this.paperid}).subscribe((response)=>{
        if(response.status=="ok"){
           // alert(JSON.stringify(response.data));
            this.ds.showqdetail({userid:localStorage.getItem('id'),examiner:this.examiner,subname:this.examsubject}).subscribe((response)=>{

              if(response.status=="ok"){
                this.paperquesid=response.data[0].questionid;
                this.paperid=response.data[0]._id;
               
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
    var object={subname:this.examsubject,examiner:this.examiner,uid:this.paperid};
    var x=CryptoJS.AES.encrypt(JSON.stringify(object),this.secretkey).toString();
    this.router.navigate(['/dashboard/addnewque'],{queryParams:{x}});
  }

}
