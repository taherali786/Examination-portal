import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { ApiService } from '../api.service';
import {CountdownModule} from 'ngx-countdown';
import {CountdownComponent} from 'ngx-countdown';

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
// i=10;

@ViewChild('countdown') counter:CountdownComponent;
  constructor(private router:Router,private ds:DataService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((d)=>{
      this.ishide2=d.get("ishide");
    })

    if(this.ishide2=="true"){
      // alert("hello");
      this.ishide3=true;
      this.isshow=false;
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
      if(this.tfProp==null || this.tfProp==''){
        alert(JSON.stringify(this.data));
        this.quedata.push({question:this.queProp,answer:this.ansProp,option:this.data});
        alert(JSON.stringify(this.quedata));
        this.ds.saveque({questionid:this.quedata,subname:localStorage.getItem('subjectname'),examiner:localStorage.getItem('subjectteacher'),userid:localStorage.getItem('id')}).subscribe((response)=>{
          if(response.status=="ok"){
            alert(response.data);
            this.queProp='';
            this.ansProp='';
            this.data.push({id:"",
            option:""});
            this.data.length=0;
            this.quedata=[];
            alert(JSON.stringify(this.quedata));
            document.getElementById('tf').click();
          }else{
            alert(response.data);
          }
        })
      }
      else{
        alert("hello");
        this.quedata.push({question:this.queProp,answer:this.ansProp,tf:this.tfProp});
        alert(JSON.stringify(this.quedata));
        this.ds.saveque({questionid:this.quedata,subname:localStorage.getItem('subjectname'),examiner:localStorage.getItem('subjectteacher'),userid:localStorage.getItem('id')}).subscribe((response)=>{
          if(response.status=="ok"){
            alert(response.data );
            this.queProp='';
            this.ansProp='';
            this.tfProp='';
            this.quedata=[];
            alert(JSON.stringify(this.quedata));
            document.getElementById('mcq').click();
          }else{
            alert(response.data);
          }
        })
      }
    }
    
  }


    // saveque(){
    //   alert(this.data[0]);
    // }
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
  alert("hii");
  if(this.ansProp==null || this.queProp==null){
    alert("answer or question are blank");
    this.ansProp='';
    this.queProp='';
  }
  else{
    if(this.tfProp==null || this.tfProp==''){
      this.quedata.push({question:this.queProp,answer:this.ansProp,option:this.data});
      this.ds.savesubmitlast({questionid:this.quedata,subname:localStorage.getItem('subjectname'),examiner:localStorage.getItem('subjectteacher'), userid:localStorage.getItem('id')}).subscribe((response)=>{
        if(response.status=="ok"){
          alert(response.data);
          this.queProp='';
          this.ansProp='';
          this.data.push({id:"",
            option:""});
            this.data.length=0;
            this.quedata=[];
            alert(JSON.stringify(this.quedata));
          document.getElementById('tf').click();
          this.router.navigate(['/dashboard/createqbank'],{queryParams:{ishide:"true"}});
        }else{
          alert(response.data);
        }
      })
    }
    else{
      this.quedata.push({question:this.queProp,answer:this.ansProp,tf:this.tfProp});
      this.ds.savesubmitlast({questionid:this.quedata,subname:localStorage.getItem('subjectname'),examiner:localStorage.getItem('subjectteacher'),userid:localStorage.getItem('id')}).subscribe((response)=>{
        if(response.status=="ok"){
          alert(response.data );
          this.queProp='';
          this.ansProp='';
          this.tfProp='';
          this.quedata=[];
          alert(JSON.stringify(this.quedata));
          document.getElementById('mcq').click();
          this.router.navigate(['/dashboard/createqbank'],{queryParams:{ishide:"true"}});
        }else{
          alert(response.data);
        }
      })
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
    if(this.tfProp==null || this.tfProp==''){
      this.quedata.push({question:this.queProp,answer:this.ansProp,option:this.data});
      this.ds.savesubmitlast({questionid:this.quedata,subname:localStorage.getItem('subjectname'),examiner:localStorage.getItem('subjectteacher'), userid:localStorage.getItem('id')}).subscribe((response)=>{
        if(response.status=="ok"){
          alert(response.data);
          this.queProp='';
          this.ansProp='';
          this.data.push({id:"",
            option:""});
            this.data.length=0;
            this.quedata=[];
            alert(JSON.stringify(this.quedata));
          document.getElementById('tf').click();
          this.router.navigate(['/dashboard/createqbank']);
        }else{
          alert(response.data);
        }
      })
    }
    else{
      this.quedata.push({question:this.queProp,answer:this.ansProp,tf:this.tfProp});
      this.ds.savesubmitlast({questionid:this.quedata,subname:localStorage.getItem('subjectname'),examiner:localStorage.getItem('subjectteacher'),userid:localStorage.getItem('id')}).subscribe((response)=>{
        if(response.status=="ok"){
          alert(response.data );
          this.queProp='';
          this.ansProp='';
          this.tfProp='';
          this.quedata=[];
          alert(JSON.stringify(this.quedata));
          document.getElementById('mcq').click();
          this.router.navigate(['/dashboard/createqbank']);
        }else{
          alert(response.data);
        }
      })
    }
  }

}


// savesubject(){
  //   this.ds.savesubject({subname:this.subnameProp,subcode:this.subcodeProp,examiner:this.examinerProp})
  //   .subscribe((response)=>{
  //     if(response.status=="ok"){
  //             //alert(response.data);
  //             alert("you are succesfully register")
  //           }else{
  //            // alert(response.data);
  //            alert("error");
  //           }
  //     })
  //   }

  //add(){
    // let row=document.createElement('div');
    //   row.className='col-sm-2';
    //   row.innerHTML=`
      
    //     <input type="text">
     
    //   `;
    //   document.querySelector(' .rows3 .form-inline').appendChild(row);
  //   let row=document.createElement('input');
  //         row.type='text';
  //         row.name='que';
          
  //         document.querySelector('.form-inline').appendChild(row);
  // }

  // onTimer(e:Event){
  //   if(e["action"]=="done"){
  //     // console.log(this.counter);
  //     setTimeout(()=>this.counter.restart());
  //   }
  // }
}