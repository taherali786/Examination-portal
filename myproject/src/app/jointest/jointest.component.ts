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
post2;
post3=[];
pid;
found;
  constructor(private ds:DataService,private router:Router) { }

  ngOnInit(): void {
   // alert("post3"+" "+JSON.stringify(this.post3));
    this.ds.openjoinpaper({privacysetting:"public"}).subscribe((response)=>{
      if(response.status=="ok"){
          this.post=response.data;
         // alert(JSON.stringify(this.post));

      }else{
         alert(response.data);
      }
    })
    
    this.ds.openjoinanswer({userid:localStorage.getItem('id')}).subscribe((response)=>{
      if(response.status=="ok"){
          this.post2=response.data;
          for(var i=0;i<this.post.length;i++){
            var a=0;
            alert(a);
            if(this.post2.length>i){
            // start_position:
            
            for(var j=0;j<this.post2.length;j++){
              alert("a "+a);
              alert(this.post[i]._id+"   "+this.post2[j].paperid);
              if(this.post[i]._id!=this.post2[j].paperid){
              alert('not matched');
               a++;
               alert(a);
              //  break start_position;
           
              }
              if(a==this.post2.length){
                  alert("hello");
                  this.post3.push(this.post[i]);
                  alert(JSON.stringify(this.post3));
              }
            }
          }else{
            alert("enter");
            this.post3.push(this.post[i]);
            alert(JSON.stringify(this.post3));
          }
          }

        //   if(this.post2.length>0){
        //   for(var i=0;i<this.post2.length;i++){
        //     var b=0;
        //     for(var j=0;j<this.post.length;j++){
        //       if(this.post[]._id==this.post2[j].paperid){
        //     }

        //   }
        // }else{
        //   this.post3.push(this.post[i]);
        // }

      }else{

         alert(response.data);
          this.post3=this.post;

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
