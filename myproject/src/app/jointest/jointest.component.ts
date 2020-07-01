import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jointest',
  templateUrl: './jointest.component.html',
  styleUrls: ['./jointest.component.css']
})
export class JointestComponent implements OnInit {
  ishide;
  ishide2=false;
  isshow=true;
post;
  constructor(private ds:DataService,private router:Router) { }

  ngOnInit(): void {

    this.ds.openjoinpaper({privacysetting:"public"}).subscribe((response)=>{
      if(response.status=="ok"){
          this.post=response.data;

      }else{
         alert(response.data);
      }
    })
  }

  goto()
  {
    //this.router.navigate(['/dashboard/addnewque'],{queryParams:{ishide:"true"}});
  }
  gotonew()
  {
    //this.router.navigate(['/dashboard/addnewque']);
  }
  
  showtext(title:string)
  {
      // if(title!=""){
      //  this.router.navigate(['/dashboard/showdetail'],{queryParams:{examsubject:title,examiner:title2}});
      // }else{
      //   alert("error");
      // }
  }
   
  edittext(title:string)
  {
    alert(title);
    this.router.navigate(['/dashboard2/jointestdetail'],{queryParams:{paperid:title}});
    
  }
  
}
