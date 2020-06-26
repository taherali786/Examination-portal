import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-createqbank',
  templateUrl: './createqbank.component.html',
  styleUrls: ['./createqbank.component.css']
})
export class CreateqbankComponent implements OnInit {
  ishide;
  ishide2=false;
  isshow=true;
   post;
  constructor(private router:Router,private route:ActivatedRoute,private ds:DataService) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((d)=>{
      this.ishide=d.get("ishide");
    })

    if(this.ishide=="true"){
      // alert("hello");
      this.ishide2=true;
      this.isshow=false;
    }else{
      this.ishide2=false;
      this.isshow=true;
    }

      this.ds.openfile({userid:localStorage.getItem('id')}).subscribe((response)=>{
        if(response.status=="ok"){
            this.post=response.data;

        }else{
          // alert(response.data);
        }
      })
  }

goto()
{
  this.router.navigate(['/dashboard/addnewque'],{queryParams:{ishide:"true"}});
}
gotonew()
{
  this.router.navigate(['/dashboard/addnewque']);
}

showtext(title:string)
{
    if(title!=""){
     this.router.navigate(['/dashboard/showdetail'],{queryParams:{id:localStorage.getItem('id'),subname:title}});
    }else{
      alert("error");
    }
}


}
