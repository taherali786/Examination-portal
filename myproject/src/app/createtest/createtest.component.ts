import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { ApiService } from '../api.service';
import { threadId } from 'worker_threads';

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
resultProp;
timerProp;
istimer=false;
selecttimerProp;
  constructor(private router:Router,private ds:DataService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((d)=>{
      this.isnext=d.get("isnext");
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
   this.router.navigate(['/dashboard/createqbank'],{queryParams:{ishide:"true"}});
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

savepaperlast(){
  // alert(this.selecttimerProp);
  this.ds.savepaperlst({subname:localStorage.getItem("examsubject"),examiner:localStorage.getItem("examteacher"),timer:this.selecttimerProp,privacysetting:this.privacyProp,timersetting:this.timerProp,userid:localStorage.getItem('id')}).subscribe((response)=>{
    if(response.status=="ok"){
        alert(response.data);
        this.router.navigate(['/dashboard/showpaper']);
    }else{
      alert(response.data);
    }
  })
 
}

timer(){
    this.istimer=true;
}

}
