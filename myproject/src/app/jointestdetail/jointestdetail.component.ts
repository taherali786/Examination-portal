import { Component, OnInit,ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import {CountdownComponent} from 'ngx-countdown';

@Component({
  selector: 'app-jointestdetail',
  templateUrl: './jointestdetail.component.html',
  styleUrls: ['./jointestdetail.component.css']
})
export class JointestdetailComponent implements OnInit {
paperid;
paperquestion;
paperoption;
papertf;
paperanswer;
isoption=false;
isft=false;
isquestion=false;
iscount=true;
iscountfalse=false;
question;
newarray;
tfProp;
tfProperty;
optionProp;
saveanswer:any[]=[];
i=20;
tf;
ft;
temp;
examsubject;
examiner;
id;
timer;
examinerid;
@ViewChild('countdown') counter:CountdownComponent;
  constructor(private router:Router,private ds:DataService,private route:ActivatedRoute) { }
 
  ngOnInit(): void {

    this.route.queryParamMap.subscribe((d)=>{
      this.paperid=d.get("paperid");
    })

    this.ds.jointestdetail({paperid:this.paperid}).subscribe((response)=>{
      if(response.status=="ok"){
         this.paperquestion=response.data[0].paper;
        this.examsubject=response.data[0].examsubject;
        this.examiner=response.data[0].examiner;
        this.id=response.data[0].user;
        this.timer=response.data[0].timer;
          this.examinerid=response.data[0].userid;
         
         document.getElementById('show').click();
         
         console.log(this.paperoption);
        
      }else{
          alert(response.data);
      }
    })

   
  }

  c=0;
 d=0;
 a=0;
 e=1;
addon(){
    if(this.c<this.paperquestion.length){
      this.isquestion=true;
      this.question=this.paperquestion[this.c].question;
      this.paperanswer=this.paperquestion[this.c].answer;
      console.log(this.paperanswer);
       if(this.paperanswer==""){
        this.isoption=false;
        this.isft=true;
         this.papertf=this.paperquestion[this.c].tf;
         this.c++;
        
       }else{
        this.isoption=true;
        this.isft=false;
        this.paperoption=this.paperquestion[this.c].option; 
        this.c++;
      
       }
     
    }else{ 
      this.isoption=false;
      this.isft=false;
      this.isquestion=false;
      this.iscount=false;
      this.iscountfalse=true;
      this.router.navigate(['/dashboard2/showresult']);
      // setTimeout(()=>this.counter.stop());
    }
    
}

optionadd(title:string){
  // alert(title);
  this.temp=title;
  if(this.paperanswer==title){
    this.a++;

    // alert(this.question);
    this.saveanswer.push({
      id:this.saveanswer.length,
      question:this.question,
      answer:this.paperanswer,
      useranswer:title,
    })
    console.log(this.saveanswer);
    
    this.ds.saveanswer({saveans:this.saveanswer,mailid:localStorage.getItem('email'),paperid:this.paperid,username:localStorage.getItem('name'),examinerid:this.examinerid,rightanswer:this.a,wronganswer:this.d,examsubject:this.examsubject,examiner:this.examiner,userid:localStorage.getItem('id')}).subscribe((response)=>{
      if(response.status=="ok"){
          this.isoption=false;
          this.isft=false;
          this.isquestion=false;
          this.saveanswer=[];
          document.getElementById('show').click();
          setTimeout(()=>this.counter.restart());
      }else{
        alert('something gone wrong');
      }
    })
  }else{
    this.d++;
    this.saveanswer.push({
      id:this.saveanswer.length,
      question:this.question,
      answer:this.paperanswer,
      useranswer:title,
    })
    console.log(this.saveanswer);

    this.ds.saveanswer({saveans:this.saveanswer,mailid:localStorage.getItem('email'),examinerid:this.examinerid,paperid:this.paperid,username:localStorage.getItem('name'),rightanswer:this.a,wronganswer:this.d,examsubject:this.examsubject,examiner:this.examiner,userid:localStorage.getItem('id')}).subscribe((response)=>{
      if(response.status=="ok"){
        this.isoption=false;
        this.isft=false;
        this.isquestion=false;
        this.saveanswer=[];
        document.getElementById('show').click();
        setTimeout(()=>this.counter.restart());
      }else{
        alert('something gone wrong');
      }
    })
   
  }
  
}

tfadd(){
  
  alert(this.tfProperty);
  console.log(this.tfProperty);
  if(this.papertf==this.tfProperty){
    // alert("same");
    this.a++;
   
    this.saveanswer.push({
      id:this.saveanswer.length,
      question:this.question,
      tf:this.papertf,
      useranswer:this.tfProperty,
    })
    console.log(this.saveanswer);

    this.ds.saveanswer({saveans:this.saveanswer,mailid:localStorage.getItem('email'),paperid:this.paperid,username:localStorage.getItem('name'),examinerid:this.examinerid,rightanswer:this.a,wronganswer:this.d,examsubject:this.examsubject,examiner:this.examiner,userid:localStorage.getItem('id')}).subscribe((response)=>{
      if(response.status=="ok"){
        this.isoption=false;
        this.isft=false;
        this.isquestion=false;
        this.tfProperty='';
        this.saveanswer=[];
        document.getElementById('show').click();
        setTimeout(()=>this.counter.restart());
      }else{
        alert('something gone wrong');
      }
    })
  }else{
    this.d++;
   
    this.saveanswer.push({
      id:this.saveanswer.length,
      question:this.question,
      tf:this.papertf,
      useranswer:this.tfProperty,
    })
    console.log(this.saveanswer);

    this.ds.saveanswer({saveans:this.saveanswer,mailid:localStorage.getItem('email'),paperid:this.paperid,username:localStorage.getItem('name'),examinerid:this.examinerid,rightanswer:this.a,wronganswer:this.d,examsubject:this.examsubject,examiner:this.examiner,userid:localStorage.getItem('id')}).subscribe((response)=>{
      if(response.status=="ok"){
        this.isoption=false;
        this.isft=false;
        this.isquestion=false;
        this.tfProperty='';
        this.saveanswer=[];
        document.getElementById('show').click();
        setTimeout(()=>this.counter.restart());
      }else{
        alert('something gone wrong');
      }
    })
   
  }
}

onTimer(e:Event){
    if(e["action"]=="done"){

   if(this.c<this.paperquestion.length){
      if(this.paperanswer==""){
        this.d++;
   
      this.saveanswer.push({
      id:this.saveanswer.length,
      question:this.question,
      tf:this.papertf,
      useranswer:'',
    })
    console.log(this.saveanswer);

    this.ds.saveanswer({saveans:this.saveanswer,mailid:localStorage.getItem('email'),paperid:this.paperid,username:localStorage.getItem('name'),examinerid:this.examinerid,rightanswer:this.a,wronganswer:this.d,examsubject:this.examsubject,examiner:this.examiner,userid:localStorage.getItem('id')}).subscribe((response)=>{
      if(response.status=="ok"){
        this.isoption=false;
        this.isft=false;
        this.isquestion=false;
        this.tfProperty='';
        this.saveanswer=[];
        document.getElementById('show').click();
        setTimeout(()=>this.counter.restart());
      }else{
        alert('something gone wrong');
      }
    })
  }else{
        this.d++;
        this.saveanswer.push({
          id:this.saveanswer.length,
          question:this.question,
          answer:this.paperanswer,
          useranswer:'',
        })
        console.log(this.saveanswer);

        this.ds.saveanswer({saveans:this.saveanswer,mailid:localStorage.getItem('email'),paperid:this.paperid,username:localStorage.getItem('name'),examinerid:this.examinerid,rightanswer:this.a,wronganswer:this.d,examsubject:this.examsubject,examiner:this.examiner,userid:localStorage.getItem('id')}).subscribe((response)=>{
          if(response.status=="ok"){
            this.isoption=false;
            this.isft=false;
            this.isquestion=false;
            this.saveanswer=[];
            document.getElementById('show').click();
            setTimeout(()=>this.counter.restart());
          }else{
            alert('something gone wrong');
          }
        })

      }
   }
  }
  }
  
}
