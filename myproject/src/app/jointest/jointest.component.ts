import { Component, OnInit,Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { start } from 'repl';
import {interval} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {Socket} from 'ngx-socket-io';

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
post4=[];
docid;
pid;
found;
idProp;
passProp;
idpasscon=true;
currentdate:number=Date.now();
subscription;


  constructor(private ds:DataService,private router:Router,private clientIO:Socket) { }

  ngOnInit(): void {
    

   this.clientIO.emit('join',()=>{
     
  })
 
  this.ds.openjoinpaper({privacysetting:"public",userid:localStorage.getItem('id')}).subscribe((response)=>{
    if(response.status=="ok"){
       
    }else{
       alert(response.data);
    }
  })
 var i=0;
  this.clientIO.on('new data',(data)=>{
    // this.post=data;
    //  console.log(this.post);
    // console.log(i++);
      let uniqId={};
    this.post=(data.filter(obj=>!uniqId[obj._id] && (uniqId[obj._id]=true)));
   
    this.ds.openjoinanswer({userid:localStorage.getItem('id')}).subscribe((response)=>{
      if(response.status=="ok"){
          this.post2=response.data;
          // console.log(this.post2);
          for(var i=0;i<this.post.length;i++){
            var a=0;
            if(this.post2.length>i){
            // start_position:
           // alert("true");
            for(var j=0;j<this.post2.length;j++){
              if(this.post[i]._id!=this.post2[j].paperid){
               a++;
              //  break start_position;
           
              }
              if(a==this.post2.length){
              this.post3.push(this.post[i]);  
              let uniqIds={};
              this.post3=(this.post3.filter(obj=>!uniqIds[obj._id] && (uniqIds[obj._id]=true)));
            
              }
            }
           
          }else{
    
            this.post3.push(this.post[i]);
            let uniqIds={};
              this.post3=(this.post3.filter(obj=>!uniqIds[obj._id] && (uniqIds[obj._id]=true)));
             
          }
          }
         
      }else{

        //  console.log(response.data);
          this.post3=this.post;
 
      }
    
    })
  // this.post="";
  this.post3=[];
  // console.log(this.post3);
  });
    
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
    //alert(title);
    this.ds.checkstudentdetail({paperid:title,email:localStorage.getItem('email')}).subscribe((response)=>{

      if(response.status=="ok"){
         
            var emailId=response.data[0].studentSetting;
            var userid=localStorage.getItem('email');
    //var username=emailId.substring(0,emailId.lastIndexOf('@'));
    var address=userid.substring(userid.lastIndexOf('@') +1);
    //alert(username);
   if(address==emailId){
    this.router.navigate(['/dashboard2/jointestdetail'],{queryParams:{paperid:title}});
   }else if(emailId==''||emailId==null||emailId===undefined){
    this.router.navigate(['/dashboard2/jointestdetail'],{queryParams:{paperid:title}});
    //alert("blank");
   }else{
     alert("You are not elligible for this exam");
   }
      }else{
          console.log(response.data);
      }
    })
   // this.router.navigate(['/dashboard2/jointestdetail'],{queryParams:{paperid:title}});
    
  }
  
  idpass(){
    //alert(this.idProp+"   "+this.passProp);

    this.ds.openjoinpaperofidpass({privacy2setting:"idpass",id:this.idProp,pass:this.passProp,userid:localStorage.getItem('id')}).subscribe((response)=>{
      if(response.status=="ok"){
        const modals=document.getElementsByClassName('modal');
        for(let i=0;i<modals.length;i++){
          modals[i].classList.remove('show');
          modals[i].setAttribute('aria-hidden','true');
          modals[i].setAttribute('style','display:none');
 
        }
        
        const modalsBackdrops=document.getElementsByClassName('modal-backdrop');
 
        for(let i=0;i<modalsBackdrops.length;i++){
          document.body.removeChild(modalsBackdrops[i]);
        }

         this.post=response.data;
        // alert(JSON.stringify(response.data));
        this.router.navigate(['/dashboard2/jointestdetail'],{queryParams:{paperid:this.post}});

      }else{
         alert(response.data);
      }
    })
  }

  next()
  {
    if(this.idProp==null){
      this.idpasscon=true;

    }else if( this.passProp==null){
      this.idpasscon=true;
    }else{
      
      this.idpasscon=false;
    }
  }
}
