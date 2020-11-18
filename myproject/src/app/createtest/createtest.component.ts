import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { ApiService } from '../api.service';
import { threadId } from 'worker_threads';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-createtest',
  templateUrl: './createtest.component.html',
  styleUrls: ['./createtest.component.css']
})
export class CreatetestComponent implements OnInit {
subnameProp;
subcodeProp;
examinerProp;
isnext;
isgood=false;
privacyProp;
privacy2Prop;
resultProp;
timerProp;
idProp;
passProp;
istimer=false;
istimers=false;
isprivate=false;
isidpass=false;
selecttimerProp;
isnextone;
id;
obj;
ids;
objs;
secretkey:string='Secret@123';
  constructor(private router:Router,private ds:DataService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((d)=>{
      this.id=d.get("x");
      if(this.id!=null){
      let bytes = CryptoJS.AES.decrypt(this.id,this.secretkey);
      this.obj =JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      this.isnextone=this.obj.isnextone;
      }
      // this.ids=d.get("y");
      // let byte = CryptoJS.AES.decrypt(this.ids,this.secretkey);
      // this.objs =JSON.parse(byte.toString(CryptoJS.enc.Utf8));
      // this.isnext=this.objs.isnext;
      //this.isnextone=d.get("isnextone");
    })
    this.route.queryParamMap.subscribe((d)=>{
      this.ids=d.get("y");
      if(this.ids!=null)
      {
      let byte = CryptoJS.AES.decrypt(this.ids,this.secretkey);
      this.objs =JSON.parse(byte.toString(CryptoJS.enc.Utf8));
      this.isnext=this.objs.isnext;
      }
      //this.isnextone=d.get("isnextone");
    })

    if(this.isnext=="nextone"){
      document.getElementById('3step').click();
    }

  
    
  }

  next()
  {
    if(this.subnameProp==null){
      // alert("fill compulsory field");

    }else if( this.examinerProp==null){
      // alert("fill compulsory field");
    }else{
      
      this.isgood=true;
    }
  }

  qbank(){
    var object={ishide:"true"};
    var x=CryptoJS.AES.encrypt(JSON.stringify(object),this.secretkey).toString();
   this.router.navigate(['/dashboard/createqbank'],{queryParams:{x}});
  }


   
savetest()
{
  
  this.ds.savetst({subname:this.subnameProp.trim(),subcode:this.subcodeProp,examiner:this.examinerProp.trim(),userid:localStorage.getItem('id')}).subscribe((response)=>{
    if(response.status=="ok"){
      // alert(JSON.stringify(response.data[0]));
      localStorage.setItem("examsubject",this.subnameProp);
      localStorage.setItem("examteacher",this.examinerProp);
      // alert(localStorage.getItem("examsubject"));
      alert("Your Test Subject is Successfully Created Now Add some Question in it ")
      document.getElementById('2step').click();
    }else{
      alert(response.data);
    }
  });
}
nextstep(){
  var object={ismanual:"true"};
  var z=CryptoJS.AES.encrypt(JSON.stringify(object),this.secretkey).toString();
 this.router.navigate(['/dashboard/addnewque'],{queryParams:{z}});
  //this.router.navigate(['/dashboard/addnewque'],{queryParams:{ismanual:"true"}});
}
savepaperlast(){
   alert(this.selecttimerProp);
  if(this.privacy2Prop=="idpass"){
    this.ds.savepaperlstone({subname:localStorage.getItem("examsubject"),examiner:localStorage.getItem("examteacher"),timer:this.selecttimerProp,privacysetting:this.privacyProp,privacy2setting:this.privacy2Prop,id:this.idProp,pass:this.passProp,timersetting:this.timerProp,userid:localStorage.getItem('id')}).subscribe((response)=>{
      if(response.status=="ok"){
          alert(response.data);
          this.router.navigate(['/dashboard/showpaper']);
      }else{
        alert(response.data);
      }
    })
  }else{
  this.ds.savepaperlst({subname:localStorage.getItem("examsubject"),examiner:localStorage.getItem("examteacher"),timer:this.selecttimerProp,privacysetting:this.privacyProp,timersetting:this.timerProp,userid:localStorage.getItem('id')}).subscribe((response)=>{
    if(response.status=="ok"){
        alert(response.data);
        this.router.navigate(['/dashboard/showpaper']);
    }else{
      alert(response.data);
    }
  })
}

 
}
idpass(){
  this.isidpass=true;
  this.idProp=Math.floor(Math.random()*10000000000+1);
  // console.log(this.idProp);
}
private(){
  this.isprivate=true;
}
timer(){
    this.istimer=true;
}

timers(){
    this.istimers=true;
}

}
