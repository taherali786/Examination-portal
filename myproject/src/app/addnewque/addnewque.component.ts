import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { ApiService } from '../api.service';
import {CountdownModule} from 'ngx-countdown';
import {CountdownComponent} from 'ngx-countdown';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-addnewque',
  templateUrl: './addnewque.component.html',
  styleUrls: ['./addnewque.component.css']
})
export class AddnewqueComponent implements OnInit {
istruefalse=false;
ismcq=true;
isgood=false;
ishide=false;
isinput=false;
subnameProp;
examinerProp;
subcodeProp;
ansProp;
queProp;
tfProp;
data:any[]=[{
  id:0,
  option:''
}
];
ishide2;
isshow=true;
ishide3=false;
quedata:any[]=[];
id;
ids;
idformanual;
objformanual;
objs;
obj;
isobjuid=false;
secretkey:string='Secret@123';
idProp;
uid;
ismanual;
fromdate=new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0]; 
todate=new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0]; 
@ViewChild('countdown') counter:CountdownComponent;
  constructor(private router:Router,private ds:DataService,private route:ActivatedRoute) { }

  ngOnInit(): void {
   
    this.route.queryParamMap.subscribe((d)=>{
      this.id=d.get("x");
      if(this.id!=null){
      let bytes = CryptoJS.AES.decrypt(this.id,this.secretkey);
      this.obj =JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      this.uid=this.obj.uid;
     
      }
      this.ids=d.get("y");
      if(this.ids!=null){
      let byte = CryptoJS.AES.decrypt(this.ids,this.secretkey);
      this.objs =JSON.parse(byte.toString(CryptoJS.enc.Utf8)); 
      this.ishide2=this.objs.ishide;
      }
      this.idformanual=d.get("z");
      if(this.idformanual!=null){
      let byte = CryptoJS.AES.decrypt(this.idformanual,this.secretkey);
      this.objformanual =JSON.parse(byte.toString(CryptoJS.enc.Utf8)); 
      this.ismanual=this.objformanual.ismanual;
      }
     // alert(localStorage.getItem('examsubject'));
     
    })
  
    
    if(this.uid!==undefined)
    {
     
      this.isobjuid=true;
      document.getElementById('nextstep').click();
    }
    if(this.uid===undefined){
    
      this.isobjuid=false;
    }
    if(this.ishide2=="true"){
      this.ishide3=true;
      this.isshow=false;
    }else if(this.ismanual=="true"){
        document.getElementById('nextstep').click();
    }else{
      this.ishide3=false;
      this.isshow=true;
    }

   

  }

  
  add(){
        if(this.data.length<5){
        this.data.push({id:this.data.length,
          option:''});
        }else{
          this.ishide=true;
          this.isinput=true;
        }
        
  }



  submit(){
    if(this.ansProp==null || this.queProp==null){
      alert("answer or question are blank");
      this.ansProp='';
      this.queProp='';
    }
    else{
      if(this.uid!==undefined)
      {
        //here goes uid code
      
        if(this.tfProp==null || this.tfProp==''){
           this.quedata.push({question:this.queProp,answer:this.ansProp,option:this.data});
           this.ds.addquestion({paper:this.quedata,objid:this.uid}).subscribe((response)=>{
             if(response.status=="ok"){
               alert(response.data);
               this.queProp='';
               this.ansProp='';
               this.data.push({id:"",
               option:""});
               this.data.length=0;
               this.quedata=[];
               document.getElementById('tf').click();
             }else{
               alert(response.data);
             }
           })
         }
       
         else{
           this.quedata.push({question:this.queProp,answer:this.ansProp,tf:this.tfProp});
           this.ds.addquestion({paper:this.quedata,objid:this.uid}).subscribe((response)=>{
             if(response.status=="ok"){
               alert(response.data );
               this.queProp='';
               this.ansProp='';
               this.tfProp='';
               this.quedata=[];
               document.getElementById('mcq').click();
             }else{
               alert(response.data);
             }
           })
         }
       
      }else if(this.uid===undefined){
      if(this.ismanual=="true"){
        if(this.tfProp==null || this.tfProp==''){
          
            this.idProp=Math.floor(Math.random()*10000000000+1);
           
           this.quedata.push({question:this.queProp,answer:this.ansProp,option:this.data});
          // alert(JSON.stringify(this.quedata));
           this.ds.savequestion({paper:this.quedata,examsubject:localStorage.getItem('examsubject'),examiner:localStorage.getItem('examteacher'),userid:localStorage.getItem('id'),privacysetting:"private",privacy2setting:"private",id:this.idProp,fromdate:this.fromdate,todate:this.todate}).subscribe((response)=>{
             if(response.status=="ok"){
               alert(response.data);
               this.queProp='';
               this.ansProp='';
               this.data.push({id:"",
               option:""});
               this.data.length=0;
               this.quedata=[];
               //alert(JSON.stringify(this.quedata));
               document.getElementById('tf').click();
             }else{
               alert(response.data);
             }
           })
         }
         else{
          this.idProp=Math.floor(Math.random()*10000000000+1);
         
           this.quedata.push({question:this.queProp,answer:this.ansProp,tf:this.tfProp});
           this.ds.savequestion({paper:this.quedata,examsubject:localStorage.getItem('examsubject'),examiner:localStorage.getItem('examteacher'),userid:localStorage.getItem('id'),privacysetting:"private",privacy2setting:"private",id:this.idProp,fromdate:this.fromdate,todate:this.todate}).subscribe((response)=>{
             if(response.status=="ok"){
               alert(response.data );
               this.queProp='';
               this.ansProp='';
               this.tfProp='';
               this.quedata=[];
               document.getElementById('mcq').click();
             }else{
               alert(response.data);
             }
           })
         }
      }else{
      if(this.tfProp==null || this.tfProp==''){
       // alert(JSON.stringify(this.data));
        this.quedata.push({question:this.queProp,answer:this.ansProp,option:this.data});
       // alert(JSON.stringify(this.quedata));
        this.ds.saveque({questionid:this.quedata,subname:localStorage.getItem('subjectname'),examiner:localStorage.getItem('subjectteacher'),userid:localStorage.getItem('id')}).subscribe((response)=>{
          if(response.status=="ok"){
            alert(response.data);
            this.queProp='';
            this.ansProp='';
            this.data.push({id:"",
            option:""});
            this.data.length=0;
            this.quedata=[];
            //alert(JSON.stringify(this.quedata));
            document.getElementById('tf').click();
          }else{
            alert(response.data);
          }
        })
      }
      else{
//alert("hello");
        this.quedata.push({question:this.queProp,answer:this.ansProp,tf:this.tfProp});
       // alert(JSON.stringify(this.quedata));
        this.ds.saveque({questionid:this.quedata,subname:localStorage.getItem('subjectname'),examiner:localStorage.getItem('subjectteacher'),userid:localStorage.getItem('id')}).subscribe((response)=>{
          if(response.status=="ok"){
            alert(response.data );
            this.queProp='';
            this.ansProp='';
            this.tfProp='';
            this.quedata=[];
            //alert(JSON.stringify(this.quedata));
            document.getElementById('mcq').click();
          }else{
            alert(response.data);
          }
        })
      }
    }
    }
  }
    
  }

  showtruefalse(){
     this.istruefalse=true;
      this.ismcq=false;
      this.data.push({id:"",
      option:""});
      this.data.length=0;
      this.ishide=false;
  }


  showmcq(){
    this.istruefalse=false;
      this.ismcq=true;
      this.tfProp='';
  }

  next()
{
  if(this.subnameProp==null){

  }else if( this.examinerProp==null){
  }else{
    this.isgood=true;
  }
}

savesubjectinfor(){
  this.ds.savesubject({subname:this.subnameProp,subcode:this.subcodeProp,examiner:this.examinerProp,userid:localStorage.getItem('id')}).subscribe((response)=>{
    if(response.status=="ok"){
//alert(response.data);
      document.getElementById('nextstep').click();
      localStorage.setItem('subjectname',this.subnameProp);
      localStorage.setItem('subjectteacher',this.examinerProp);
    }else{
      alert(response.data);
    }
  });
 
}

submitlast(){
  //alert("hii");
  if(this.ansProp==null || this.queProp==null){
    alert("answer or question are blank");
    this.ansProp='';
    this.queProp='';
  }
  else{
    if(this.uid!==undefined)
    {
      //here goes uid code
      if(this.tfProp==null || this.tfProp==''){
         this.quedata.push({question:this.queProp,answer:this.ansProp,option:this.data});
        // alert(JSON.stringify(this.quedata));
         this.ds.addquestionlast({paper:this.quedata,objid:this.uid,privacysetting:"private",privacy2setting:"private"}).subscribe((response)=>{
           if(response.status=="ok"){
             alert(response.data);
             this.queProp='';
             this.ansProp='';
             this.data.push({id:"",
             option:""});
             this.data.length=0;
             this.quedata=[];
             //alert(JSON.stringify(this.quedata));
             document.getElementById('tf').click();
             var teacher=response.data[0].examiner;
             var subjectname=response.data[0].subname;
             var obj={examiner:teacher,subname:subjectname};
             var x=CryptoJS.AES.encrypt(JSON.stringify(obj),this.secretkey).toString();
             this.router.navigate(['/dashboard/showqdetail'],{queryParams:{x}});
           }else{
             alert(response.data);
           }
         })
       }
     
       else{
         this.quedata.push({question:this.queProp,answer:this.ansProp,tf:this.tfProp});
         this.ds.addquestionlast({paper:this.quedata,objid:this.uid,privacysetting:"private",privacy2setting:"private"}).subscribe((response)=>{
           if(response.status=="ok"){
             alert(response.data );
             this.queProp='';
             this.ansProp='';
             this.tfProp='';
             this.quedata=[];
             document.getElementById('mcq').click();
             var teacher=response.data[0].examiner;
             var subjectname=response.data[0].subname;
             var obj={examiner:teacher,subname:subjectname};
             var x=CryptoJS.AES.encrypt(JSON.stringify(obj),this.secretkey).toString();
             this.router.navigate(['/dashboard/showqdetail'],{queryParams:{x}});
           }else{
             alert(response.data);
           }
         })
       }
     
    }else if(this.uid===undefined){
    if(this.ismanual=="true"){
    
      if(this.tfProp==null || this.tfProp==''){
         this.quedata.push({question:this.queProp,answer:this.ansProp,option:this.data});
         this.ds.savequestionlast({paper:this.quedata,examsubject:localStorage.getItem('examsubject'),examiner:localStorage.getItem('examteacher'),userid:localStorage.getItem('id'),privacysetting:"private",privacy2setting:"private"}).subscribe((response)=>{
           if(response.status=="ok"){
             alert(response.data);
             this.queProp='';
             this.ansProp='';
             this.data.push({id:"",
             option:""});
             this.data.length=0;
             this.quedata=[];
             document.getElementById('tf').click();
        
            var object={paperid:response.data[0]._id};
            var x=CryptoJS.AES.encrypt(JSON.stringify(object),this.secretkey).toString();
            this.router.navigate(['/dashboard/showpaperdetail'],{queryParams:{x}});
            
           }else{
             alert(response.data);
           }
         })
       }
       else{
        
         this.quedata.push({question:this.queProp,answer:this.ansProp,tf:this.tfProp});
         this.ds.savequestionlast({paper:this.quedata,examsubject:localStorage.getItem('examsubject'),examiner:localStorage.getItem('examteacher'),userid:localStorage.getItem('id'),privacysetting:"private",privacy2setting:"private"}).subscribe((response)=>{
           if(response.status=="ok"){
             alert(response.data );
             this.queProp='';
             this.ansProp='';
             this.tfProp='';
             this.quedata=[];
             document.getElementById('mcq').click();
           
            var object={paperid:response.data[0]._id};
            var x=CryptoJS.AES.encrypt(JSON.stringify(object),this.secretkey).toString();
            this.router.navigate(['/dashboard/showpaperdetail'],{queryParams:{x}});
           }else{
             alert(response.data);
           }
         })
       }
    }else{
    if(this.tfProp==null || this.tfProp==''){
    
      this.quedata.push({question:this.queProp,answer:this.ansProp,option:this.data});
      this.ds.savesubmitlast({questionid:this.quedata,subname:localStorage.getItem('subjectname'),examiner:localStorage.getItem('subjectteacher'), userid:localStorage.getItem('id'),privacysetting:"private",privacy2setting:"private"}).subscribe((response)=>{
        if(response.status=="ok"){
          this.queProp='';
          this.ansProp='';
          this.tfProp='';
          this.quedata=[];
          document.getElementById('mcq').click();
          var paper_id=response.data[0]._id;
          var obj={paperid:paper_id};
          var x=CryptoJS.AES.encrypt(JSON.stringify(obj),this.secretkey).toString();
          this.router.navigate(['/dashboard/showqdetail'],{queryParams:{x}});
        }else{
          alert(response.data);
        }
      })
    }
    else{
     
      this.quedata.push({question:this.queProp,answer:this.ansProp,tf:this.tfProp});
      this.ds.savesubmitlast({questionid:this.quedata,subname:localStorage.getItem('subjectname'),examiner:localStorage.getItem('subjectteacher'),userid:localStorage.getItem('id'),privacysetting:"private",privacy2setting:"private"}).subscribe((response)=>{
        if(response.status=="ok"){
          this.queProp='';
          this.ansProp='';
          this.tfProp='';
          this.quedata=[];
          document.getElementById('mcq').click();
          var paper_id=response.data[0]._id;
          var obj={paperid:paper_id};
          var x=CryptoJS.AES.encrypt(JSON.stringify(obj),this.secretkey).toString();
          this.router.navigate(['/dashboard/showqdetail'],{queryParams:{x}});
        }else{
          alert(response.data);
        }
      })
    }
  }
}
  }

}

submitlast1(){

  if(this.ansProp==null || this.queProp==null){
    alert("answer or question are blank");
    this.ansProp='';
    this.queProp='';
  }
  else{
    if(this.uid!==undefined)
    {
      //here goes uid code
    //  alert(this.uid);
      if(this.tfProp==null || this.tfProp==''){
        // alert(JSON.stringify(this.data));
         
         this.quedata.push({question:this.queProp,answer:this.ansProp,option:this.data});
        // alert(JSON.stringify(this.quedata));
         this.ds.addquestionlast({paper:this.quedata,objid:this.uid,privacysetting:"private",privacy2setting:"private"}).subscribe((response)=>{
           if(response.status=="ok"){
            
             this.queProp='';
             this.ansProp='';
             this.data.push({id:"",
             option:""});
             this.data.length=0;
             this.quedata=[];
             //alert(JSON.stringify(this.quedata));
             document.getElementById('tf').click();
             var teacher=response.data[0].examiner;
             var subjectname=response.data[0].subname;
             var obj={examiner:teacher,subname:subjectname};
             var x=CryptoJS.AES.encrypt(JSON.stringify(obj),this.secretkey).toString();
             this.router.navigate(['/dashboard/showqdetail'],{queryParams:{x}});
           }else{
             alert(response.data);
           }
         })
       }
     
       else{
         this.quedata.push({question:this.queProp,answer:this.ansProp,tf:this.tfProp});
         this.ds.addquestionlast({paper:this.quedata,objid:this.uid,privacysetting:"private",privacy2setting:"private"}).subscribe((response)=>{
           if(response.status=="ok"){
            
             this.queProp='';
             this.ansProp='';
             this.tfProp='';
             this.quedata=[];
             document.getElementById('mcq').click();
             var teacher=response.data[0].examiner;
             var subjectname=response.data[0].subname;

             var obj={examiner:teacher,subname:subjectname};
             var x=CryptoJS.AES.encrypt(JSON.stringify(obj),this.secretkey).toString();
             this.router.navigate(['/dashboard/showqdetail'],{queryParams:{x}});
           }else{
             alert(response.data);
           }
         })
       }
     
    }else if(this.uid===undefined){
    if(this.ismanual=="true"){

      if(this.tfProp==null || this.tfProp==''){
      
        this.idProp=Math.floor(Math.random()*10000000000+1);
       
         this.quedata.push({question:this.queProp,answer:this.ansProp,option:this.data});
        // alert(JSON.stringify(this.quedata));
         this.ds.savequestionlast({paper:this.quedata,examsubject:localStorage.getItem('examsubject'),examiner:localStorage.getItem('examteacher'),userid:localStorage.getItem('id'),privacysetting:"private",privacy2setting:"private",id:this.idProp,fromdate:this.fromdate,todate:this.todate}).subscribe((response)=>{
           if(response.status=="ok"){
            
             this.queProp='';
             this.ansProp='';
             this.data.push({id:"",
             option:""});
             this.data.length=0;
             this.quedata=[];
             //alert(JSON.stringify(this.quedata));
             document.getElementById('tf').click();
            var object={paperid:response.data[0]._id};
            var x=CryptoJS.AES.encrypt(JSON.stringify(object),this.secretkey).toString();
            this.router.navigate(['/dashboard/showpaperdetail'],{queryParams:{x}});
           }else{
             alert(response.data);
           }
         })
       }
       else{
        
         this.idProp=Math.floor(Math.random()*10000000000+1);
        
         this.quedata.push({question:this.queProp,answer:this.ansProp,tf:this.tfProp});
         this.ds.savequestionlast({paper:this.quedata,examsubject:localStorage.getItem('examsubject'),examiner:localStorage.getItem('examteacher'),userid:localStorage.getItem('id'),privacysetting:"private",privacy2setting:"private",id:this.idProp,fromdate:this.fromdate,todate:this.todate}).subscribe((response)=>{
           if(response.status=="ok"){
            
             this.queProp='';
             this.ansProp='';
             this.tfProp='';
             this.quedata=[];
             document.getElementById('mcq').click();
            var object={paperid:response.data[0]._id};
            var x=CryptoJS.AES.encrypt(JSON.stringify(object),this.secretkey).toString();
            this.router.navigate(['/dashboard/showpaperdetail'],{queryParams:{x}});
           }else{
             alert(response.data);
           }
         })
       }
    }else{
     
    if(this.tfProp==null || this.tfProp==''){
      this.quedata.push({question:this.queProp,answer:this.ansProp,option:this.data});
      this.ds.savesubmitlast({questionid:this.quedata,subname:localStorage.getItem('subjectname'),examiner:localStorage.getItem('subjectteacher'), userid:localStorage.getItem('id'),privacysetting:"private",privacy2setting:"private"}).subscribe((response)=>{
        if(response.status=="ok"){
          this.queProp='';
          this.ansProp='';
          this.tfProp='';
          this.quedata=[];
          document.getElementById('mcq').click();
          var paper_id=response.data[0]._id;
          var obj={paperid:paper_id};
          var x=CryptoJS.AES.encrypt(JSON.stringify(obj),this.secretkey).toString();
          this.router.navigate(['/dashboard/showqdetail'],{queryParams:{x}});
        }else{
          alert(response.data);
        }
      })
    }
    else{
    
      this.quedata.push({question:this.queProp,answer:this.ansProp,tf:this.tfProp});
      this.ds.savesubmitlast({questionid:this.quedata,subname:localStorage.getItem('subjectname'),examiner:localStorage.getItem('subjectteacher'),userid:localStorage.getItem('id'),privacysetting:"private",privacy2setting:"private"}).subscribe((response)=>{
        if(response.status=="ok"){
         
          this.queProp='';
          this.ansProp='';
          this.tfProp='';
          this.quedata=[];
          document.getElementById('mcq').click();
          var paper_id=response.data[0]._id;
          var obj={paperid:paper_id};
          var x=CryptoJS.AES.encrypt(JSON.stringify(obj),this.secretkey).toString();
          this.router.navigate(['/dashboard/showqdetail'],{queryParams:{x}});
        }else{
          alert(response.data);
        }
      })
    }
  }
  }
  }
}



}