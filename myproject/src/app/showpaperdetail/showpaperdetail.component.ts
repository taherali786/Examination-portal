import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import * as CryptoJS from 'crypto-js';
import { scheduled } from 'rxjs';
import * as moment from 'moment';

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
  privacyProp;
  privacy2Prop;
  privacy;
  publicCheck=false;
  privateCheck=false;
  private2Check=false;
  isidpass=false;
  istimer=false;
  isprivate=false;
  ifispublic=false;
  ifisprivate=false;
  ifisprivate2=false;
  ifisidpass=false;
  ifisidpasss=false;
  ifisevery=false;
  ifiswhole=false;
  ifisschedule=false;
  istimers=false;
  iflivenow=false;
  ifschedule=false;
  from;
  to;
  perquestion;
  passCriteria;
  fromdatetimerProp;
  todatetimerProp; 
  scheduleProp;
  timersetting;
  idProp;
  passProp;
  timerProp;
  selecttimerProp;
  passCriteriaProp;
  scheduler;
  pqmark;
  privacy2;
  id;
  obj;
  ids;
  objs;
  studentSettingProp;
  paper_id;
  questionid;
  objectformanual;
  secretkey:string='Secret@123';
  
  constructor(private route:ActivatedRoute,private ds:DataService,private router:Router) { 
  }

  ngOnInit(): void {
   
    this.route.queryParamMap.subscribe((d)=>{
      this.id=d.get("x");
      let bytes = CryptoJS.AES.decrypt(this.id,this.secretkey);
      this.obj =JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      this.paper_id=this.obj.paperid;
      // localStorage.setItem('subjectteacher',this.examiner);
      // this.examsubject=this.obj.examsubject;
    })

    this.ds.showpaperdetail({paperid:this.paper_id}).subscribe((response)=>{

      if(response.status=="ok"){
        this.paperquesid=response.data[0].paper;
        this.paperid=response.data[0]._id;
        this.questionid=response.data[0].questionid;
        this.privacy=response.data[0].privacysetting;
        this.privacy2=response.data[0].privacy2setting;
        this.idProp=response.data[0].id;
        this.scheduler=response.data[0].schedule;
        this.from=response.data[0].fromdate;
        this.fromdatetimerProp=this.from;
       
        if(this.from!=null ||this.from!==undefined)
        {
          this.from=this.from.replace("T"," ");
        }
      
        this.to=response.data[0].todate;
        this.todatetimerProp=this.to;
        if(this.to!=null || this.to!==undefined)
        {
          this.to=this.to.replace("T"," ");
        }
      
        this.perquestion=response.data[0].perquestion;
        this.passCriteria=response.data[0].passCritertia;
        this.timersetting=response.data[0].timersetting;
        this.timerset=response.data[0].timer;
        if(this.timersetting=="timeoneveryque"){
            this.ifisevery=true;
            this.istimer=true;
            this.selecttimerProp=this.timerset;
            this.timerProp=this.timersetting;
            this.istimers=false;
            this.ifiswhole=false;
        }else if(this.timersetting=="timeonwholeses"){
          this.selecttimerProp=this.timerset;
          this.timerProp=this.timersetting;
          this.ifiswhole=true;
          this.ifisevery=false;
          this.istimers=true;
          this.istimer=false;
        }


        if(this.perquestion!=null || this.perquestion!="" || this.perquestion!==undefined)
        {
          this.pqmark=this.perquestion;
        }
        if(this.passCriteria!=null || this.passCriteria!="" || this.passCriteria!==undefined)
        {
          this.passCriteriaProp=this.passCriteria;
        }
          if(this.privacy=="public"){
            // document.getElementById('public').checked==true;
            this.privacyProp='public';
            this.publicCheck=true;
            this.privateCheck=false;
            this.ifispublic=true;
          }else if(this.privacy=="private"){
            this.isprivate=true;
            this.ifisprivate=true;
            this.privacyProp='private';
            if(this.privacy2=="private"){
            this.privacy2Prop='private';
       
            this.ifisprivate2=true;
            this.ifisidpasss=false;
            }else{
              this.isidpass=true;
              this.ifisidpasss=false;
              this.ifisprivate2=true;
              this.privacy2Prop='idpass';
              this.idProp=response.data[0].id;
              this.passProp=response.data[0].pass;
            }
          }
          if(this.scheduler=="live now")
          {
            this.ifschedule=false;
            this.iflivenow=true;
            this.scheduleProp=this.scheduler;
          }else if(this.scheduler=="schedule")
          {
          
            this.ifschedule=true;
            this.iflivenow=false;
            this.ifisschedule=true;
            this.fromdatetimerProp=this.from;
            this.todatetimerProp=this.to;
            this.scheduleProp=this.scheduler;
           
          }
       
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
            this.ds.showpaperdetail({paperid:this.paper_id}).subscribe((response)=>{

              if(response.status=="ok"){
                this.paperquesid=response.data[0].paper;
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

  addmore(title:string,title2:string){
    if(title!=='' && title!=null){
     
      var object={questionid:title,paper_id:title2};
      var a=CryptoJS.AES.encrypt(JSON.stringify(object),this.secretkey).toString();
      this.router.navigate(['/dashboard/showdetail'],{queryParams:{a}});
    }else{
     
      var objectformanual={ismanual:"true"};
      var z=CryptoJS.AES.encrypt(JSON.stringify(objectformanual),this.secretkey).toString();
     this.router.navigate(['/dashboard/addnewque'],{queryParams:{z}});
    }
   
  }

  updateprivacy(){
    
   this.ds.updateprivacysetting({paperid:this.paperid,privacy:this.privacyProp}).subscribe((response)=>{
     if(response.status=="ok"){
      alert(response.data);
      this.ds.showpaperdetail({paperid:this.paper_id}).subscribe((response)=>{

        if(response.status=="ok"){
          this.paperquesid=response.data[0].paper;
          this.paperid=response.data[0]._id;
          this.privacy=response.data[0].privacysetting;
            if(this.privacy=="public"){
              // document.getElementById('public').checked==true;
              this.privacyProp='public';
            }else{
              this.privacyProp='private';
            }
        
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

  updateprivacy2(){
    if(this.privacy2Prop=="private"){
     // alert(this.privacy2Prop);
      this.ds.updateprivacy2setting({paperid:this.paperid,privacy2:this.privacy2Prop}).subscribe((response)=>{
        if(response.status=="ok"){
         alert(response.data);
        }else{
          alert(response.data);
        }
      })
    }else{
  
    }
  }

  
  checking(checked){
    
    if(checked){
      const mq=window.matchMedia("(max-width:800px)");
      if(mq.matches){
        console.log("matcjhed");
        document.getElementById('second').style.left='-70%';
        document.getElementById('boxes').style.width="30%";
        document.getElementById('second').style.width="100%";
        document.getElementById('formid').style.margin="0 auto";
        document.getElementById('btn').style.display="none";
        document.getElementById('second').style.transition=".4s";
        document.getElementById('boxes').style.transition=".4s";
      }else{
        console.log("not matched");
     document.getElementById('second').style.left='-50%';
     document.getElementById('boxes').style.width="50%";
     document.getElementById('second').style.width="50%";
     document.getElementById('btn').style.display="none";
     document.getElementById('second').style.transition=".4s";
     document.getElementById('boxes').style.transition=".4s";
      }
  }else{
    document.getElementById('second').style.left='0px';
    document.getElementById('second').style.transition=".4s";
     document.getElementById('boxes').style.width="100%";
     document.getElementById('boxes').style.transition=".4s";
     document.getElementById('btn').style.display="block";
  }
}
idpass(){
  this.isidpass=true
}
savepaperlast(){
  if(this.privacyProp=="" || this.privacyProp==null ||this.privacyProp===undefined){
      alert("Please Chhose Privacy Setting");
      return true;
  }else{
    if(this.privacyProp=="private"){
      if(this.privacy2Prop=="" || this.privacy2Prop==null || this.privacy2Prop===undefined){
        alert("Please Chhose Privacy2 Setting");
        return true;
        }else{
          if(this.privacy2Prop=="idpass"){
            if(this.idProp=="" || this.idProp==null || this.idProp===undefined && this.passProp=="" || this.passProp==null || this.passProp===undefined){
              alert("Please Fill id and Pass Fiiled");
              return true;
            }
          }
        }
    }
  }

  if(this.timerProp=="" || this.timerProp==null || this.timerProp===undefined){
    alert("Please Choose timer Slot");
  }else{
    if(this.timerProp=="timeoneveryque"){
        if(this.selecttimerProp==""||this.selecttimerProp==null || this.selecttimerProp===undefined){
          alert("Please Choose time");
          return true;
        }
    }
    if(this.timerProp=="timeonwholeses"){

      if(this.selecttimerProp==""||this.selecttimerProp==null || this.selecttimerProp===undefined){
        alert("Please Choose time");
        return true;
      }
    }
  }

  if(this.scheduleProp=="" || this.scheduleProp==null || this.scheduleProp===undefined){
    alert("Please Choose Schedule");
    return true;
  }else{
    if(this.scheduleProp=="schedule"){
      if(this.fromdatetimerProp=="" || this.fromdatetimerProp==null || this.fromdatetimerProp===undefined){
        alert("Please Choose Starting Date");
        return true;
      }
      if(this.todatetimerProp=="" || this.todatetimerProp==null || this.todatetimerProp===undefined){
        alert("Please Choose Ending Date");
        return true;
      }
    }
  }

  if(this.pqmark=="" || this.pqmark==null || this.pqmark===undefined){
    return true;
  }

  if(this.passCriteriaProp=="" || this.passCriteriaProp==null || this.passCriteriaProp===undefined){
    return true;
  }

  this.fromdatetimerProp=moment(this.fromdatetimerProp);
  this.fromdatetimerProp=moment.utc(this.fromdatetimerProp).format();
this.todatetimerProp=moment(this.todatetimerProp);
this.todatetimerProp=moment.utc(this.todatetimerProp).format();
  this.ds.updatepaperlast({paperid:this.paperid,privacysetting:this.privacyProp,privacy2setting:this.privacy2Prop,timersetting:this.timerProp,timer:this.selecttimerProp,id:this.idProp,pass:this.passProp,schedule:this.scheduleProp,fromdate:this.fromdatetimerProp,todate:this.todatetimerProp,perquestion:this.pqmark,passCriteria:this.passCriteriaProp,studentSetting:this.studentSettingProp}).subscribe((response)=>{
    if(response.status=="ok"){
      alert(response.data);
      this.ds.showpaperdetail({paperid:this.paper_id}).subscribe((response)=>{

        if(response.status=="ok"){
          this.paperquesid=response.data[0].paper;
          this.paperid=response.data[0]._id;
          this.privacy=response.data[0].privacysetting;
          this.privacy2=response.data[0].privacy2setting;
          this.scheduler=response.data[0].schedule;
          this.from=response.data[0].fromdate;
         this.from=this.from.replace("T"," ")
          this.to=response.data[0].todate;
          this.to=this.to.replace("T"," ")
          this.perquestion=response.data[0].perquestion;
          this.passCriteria=response.data[0].passCritertia;
          this.timersetting=response.data[0].timersetting
          this.timerset=response.data[0].timer;
          if(this.timersetting=="timeoneveryque"){
              this.ifisevery=true;
              this.istimer=true;
              this.selecttimerProp=this.timerset;
              this.timerProp=this.timersetting;
              this.istimers=false;
              this.ifiswhole=false;
          }else if(this.timersetting=="timeonwholeses"){
            this.selecttimerProp=this.timerset;
            this.timerProp=this.timersetting;
            this.ifiswhole=true;
            this.ifisevery=false;
            this.istimers=true;
            this.istimer=false;
          }
          if(this.perquestion!=null || this.perquestion!="" || this.perquestion!==undefined)
          {
            this.pqmark=this.perquestion;
          }
          if(this.passCriteria!=null || this.passCriteria!="" || this.passCriteria!==undefined)
          {
            this.passCriteriaProp=this.passCriteria;
          }
            if(this.privacy=="public"){
              // document.getElementById('public').checked==true;
              this.privacyProp='public';
              this.publicCheck=true;
              this.privateCheck=false;
              this.ifispublic=true;
            }else if(this.privacy=="private"){
              this.isprivate=true;
              this.ifisprivate=true;
              this.privacyProp='private';
              if(this.privacy2=="private"){
              this.privacy2Prop='private';
         
              this.ifisprivate2=true;
              this.ifisidpasss=false;
              }else{
                this.isidpass=true;
                this.ifisidpasss=false;
                this.ifisprivate2=true;
                this.privacy2Prop='idpass';
                this.idProp=response.data[0].id;
                this.passProp=response.data[0].pass;
              }
            }
            if(this.scheduler=="live now")
            {
              this.ifschedule=false;
              this.iflivenow=true;
              this.scheduleProp=this.scheduler;
            }else if(this.scheduler=="schedule")
            {
              this.ifschedule=true;
              this.iflivenow=false;
              this.ifisschedule=true;
              this.fromdatetimerProp=this.from;
              this.todatetimerProp=this.to;
              this.scheduleProp=this.scheduler;
             
            }
         
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
private(){
  this.isprivate=true;
}
public(){
  this.isprivate=false;
  this.isidpass=false;
}
private2(){
  this.isidpass=false;
}
livenowsetting(){
  this.ifisschedule=false;
}
timer(){
  this.istimer=true;
  this.istimers=false;
}
timers(){
  this.istimers=true;
  this.istimer=false;
}

schedulesetting(){
  this.ifisschedule=true;
}
 
}
