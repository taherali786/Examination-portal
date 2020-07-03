import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-showqbank',
  templateUrl: './showqbank.component.html',
  styleUrls: ['./showqbank.component.css']
})
export class ShowqbankComponent implements OnInit {
  ishide;
  ishide2=false;
  isshow=true;
   post;
   name=localStorage.getItem('name');
   number;
  constructor(private route:ActivatedRoute,private ds:DataService,private router:Router) { }

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

      this.ds.openstudentqbank({userid:localStorage.getItem('id')}).subscribe((response)=>{
        if(response.status=="ok"){
            this.post=response.data;
            this.number=this.post.length;
        }else{
          // alert(response.data);
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
    if(title!=""){
     alert(title);
     this.router.navigate(['/dashboard2/showqbankdetail'],{queryParams:{id:title}});
    }else{
      alert("error");
    }
}

edittext(title:string,title2:string)
{
  // console.log(title);
  // console.log(title2);
    // if(title!="" && title2!=""){
    //   // alert(title);
    //   console.log(title);
    //   console.log(title2);
    //  this.router.navigate(['/dashboard/showqdetail'],{queryParams:{subname:title,examiner:title2}});
    // }else{
    //   alert("error");
    // }
}

dlttext(title:string,title2:string){
  console.log(title);
  console.log(title2);
  this.ds.dltqbank({subname:title,examiner:title2,userid:localStorage.getItem('id')})
  .subscribe((response)=>{
    if(response.status=="ok"){
        alert(response.data);
        this.ds.openfile({userid:localStorage.getItem('id')}).subscribe((response)=>{
          if(response.status=="ok"){
              this.post=response.data;
              this.number=this.post.length;
          }else{
            // alert(response.data);
          }
        })
    }else{
      alert(response.data);
    }
  })
}


}
