import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-showresult',
  templateUrl: './showresult.component.html',
  styleUrls: ['./showresult.component.css']
})
export class ShowresultComponent implements OnInit {
  ishide;
  ishide2=false;
  isshow=true;
post;
rightanswer;
wronganswer;
total;
  constructor(private ds:DataService,private router:Router) { }

  ngOnInit(): void {

    this.ds.showresult({userid:localStorage.getItem('id')}).subscribe((response)=>{
      if(response.status=="ok"){
          this.post=response.data;
          this.rightanswer=response.data[0].rightanswer;
          this.wronganswer=response.data[0].wronganswer;
          this.total=this.rightanswer+this.wronganswer;
          alert(this.rightanswer+this.wronganswer);

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
   // this.router.navigate(['/dashboard2/jointestdetail'],{queryParams:{paperid:title}});
    
  }
  

}
