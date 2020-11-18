import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import * as CryptoJS from 'crypto-js';

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
  secretkey:string='Secret@123';
  id;
  obj;
  ids;
  objs;
  paperid;
  questionid;
  paper_id;
  idProp;
  fromdate=new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0]; 
  todate=new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0]; 
  constructor(private route:ActivatedRoute,private ds:DataService,private router:Router) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((d)=>{
      this.id=d.get("z");
      if(this.id!=null){
      let bytes = CryptoJS.AES.decrypt(this.id,this.secretkey);
      this.obj =JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      //this.examsubject=this.obj.subname;
      this.paperid=this.obj.paperid;
     
      }
    })
    this.route.queryParamMap.subscribe((d)=>{
      this.ids=d.get("a");
      if(this.ids!=null){
      let byte = CryptoJS.AES.decrypt(this.ids,this.secretkey);
      this.obj =JSON.parse(byte.toString(CryptoJS.enc.Utf8));
      this.questionid=this.obj.questionid;
      this.paper_id=this.obj.paper_id;
     
      }
    })

    
 
   if(this.paperid!=null){
  
    this.ds.showallquestionpaper({paperid:this.paperid}).subscribe((response)=>{

      if(response.status=="ok"){
        this.quesid=response.data[0].questionid;
      }else{
        alert("Your Question Bank is Not Available We rediredting.. you to Question Bank Page ");
        this.router.navigate(['/dashboard/createqbank']);
      }
    })
  }else if(this.questionid!=null){
  
    this.ds.showallquestionpaper({paperid:this.questionid}).subscribe((response)=>{

      if(response.status=="ok"){
        this.quesid=response.data[0].questionid;
      }else{
        alert("Your Question Bank is Not Available We rediredting.. you to Question Bank Page ");
        this.router.navigate(['/dashboard/createqbank']);
      }
    })
  }
  else {
  
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
     
    }else{
      this.select.splice(this.select.indexOf(p),1);
      
    }
  }

  choosed(){
    // alert(JSON.stringify(this.select));
    if(this.examiner!=null){
       // alert("inserr block");
      
      this.ds.savepaper({paper:this.select,examsubject:localStorage.getItem("examsubject"),examiner:localStorage.getItem("examteacher"),userid:localStorage.getItem('id')}).subscribe((response)=>{
        if(response.status=="ok"){
          //alert(JSON.stringify(response.data));
          var object={isnext:"nextone"};
          var y=CryptoJS.AES.encrypt(JSON.stringify(object),this.secretkey).toString();
          this.router.navigate(['/dashboard/createtest'],{queryParams:{y}});
        }else{
            alert(response.data);
        }
      })
    }else if(this.paperid!=null){
    
      this.idProp=Math.floor(Math.random()*10000000000+1);
    
        this.ds.savepaper({paper:this.select,examsubject:localStorage.getItem("examsubject"),examiner:localStorage.getItem("examteacher"),userid:localStorage.getItem('id'),questionid:this.paperid,privacysetting:"private",privacy2setting:"private",id:this.idProp,fromdate:this.fromdate,todate:this.todate}).subscribe((response)=>{
          if(response.status=="ok"){
            var object={paperid:response.data[0]._id};
            var x=CryptoJS.AES.encrypt(JSON.stringify(object),this.secretkey).toString();
            this.router.navigate(['/dashboard/showpaperdetail'],{queryParams:{x}});
          }else{
              alert(response.data);
          }
        })
      
    }
    else if(this.questionid!=null){ 
  
      for(var i=0;i<this.select.length;i++){
       
      this.ds.updatepaperlst({paper:this.select[i],paperid:this.paper_id,privacysetting:"private",privacy2setting:"private"}).subscribe((response)=>{
        if(response.status=="ok"){
          var object={paperid:this.paper_id};
          var x=CryptoJS.AES.encrypt(JSON.stringify(object),this.secretkey).toString();
          this.router.navigate(['/dashboard/showpaperdetail'],{queryParams:{x}});
        }else{
            alert(response.data);
        }
      })
    }
    }
    
  }

} 
