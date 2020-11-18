import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import * as CryptoJS from 'crypto-js';

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
   name=localStorage.getItem('name');
   number;
   secretkey:string='Secret@123';
   id;
   obj;
  constructor(private router:Router,private route:ActivatedRoute,private ds:DataService) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((d)=>{
      this.id=d.get("x");
      if(this.id!=null){
      let bytes = CryptoJS.AES.decrypt(this.id,this.secretkey);
      this.obj =JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      this.ishide=this.obj.ishide;
      }
     
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
            this.number=this.post.length;
        }else{
          // alert(response.data);
        }
      })
  }

goto()
{
  var object={ishide:"true"};
  var y=CryptoJS.AES.encrypt(JSON.stringify(object),this.secretkey).toString();
  this.router.navigate(['/dashboard/addnewque'],{queryParams:{y}});
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
    if(title!=""){
     
      var object={paperid:title};
      var x=CryptoJS.AES.encrypt(JSON.stringify(object),this.secretkey).toString();
     this.router.navigate(['/dashboard/showqdetail'],{queryParams:{x}});
    }else{
      alert("error");
    }
}

dlttext(title:string,title2:string,title3:string){
  // console.log(title);
  this.ds.dltqbank({subname:title,examiner:title2,userid:localStorage.getItem('id'),paperid:title3})
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
