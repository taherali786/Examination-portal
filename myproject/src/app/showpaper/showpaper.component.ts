import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-showpaper',
  templateUrl: './showpaper.component.html',
  styleUrls: ['./showpaper.component.css']
})
export class ShowpaperComponent implements OnInit {
  ishide;
  ishide2=false;
  isshow=true;
   post;
   name=localStorage.getItem('name');
   number;
   secretkey:string='Secret@123';
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

      this.ds.openpaper({userid:localStorage.getItem('id')}).subscribe((response)=>{
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
  this.router.navigate(['/dashboard/addnewque'],{queryParams:{ishide:"true"}});
}
gotonew()
{
  this.router.navigate(['/dashboard/addnewque']);
}

showtext(title:string)
{
    if(title!=""){
      var object={paperid:title};
      var z=CryptoJS.AES.encrypt(JSON.stringify(object),this.secretkey).toString();
      this.router.navigate(['/dashboard/showdetail'],{queryParams:{z}});
    }else{
      alert("error");
    }
}
 
edittext(title:string)
{
  // console.log(title);
  // console.log(title2);
    if(title!=""){
      // alert(title);
      var object={paperid:title};
      var x=CryptoJS.AES.encrypt(JSON.stringify(object),this.secretkey).toString();
      this.router.navigate(['/dashboard/showpaperdetail'],{queryParams:{x}});
    }else{
      alert("error");
    }
}

dlttext(title:string,title2:string){
 
  this.ds.dltext({id:title,paperid:title2})
  .subscribe((response)=>{
    if(response.status=="ok"){
        alert(response.data);
        this.ds.openpaper({userid:localStorage.getItem('id')}).subscribe((response)=>{
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
