import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-addnewque',
  templateUrl: './addnewque.component.html',
  styleUrls: ['./addnewque.component.css']
})
export class AddnewqueComponent implements OnInit {
istruefalse=true;
ismcq=false;
isgood=true;
Hello=false;

subnameProp;
examinerProp;
subcodeProp;
  constructor(private router:Router,private ds:DataService) { }

  ngOnInit(): void {
  }

  add(){
    // let row=document.createElement('div');
    //   row.className='col-sm-2';
    //   row.innerHTML=`
      
    //     <input type="text">
     
    //   `;
    //   document.querySelector(' .rows3 .form-inline').appendChild(row);
    let row=document.createElement('input');
          row.type='text';
          document.querySelector('.form-inline').appendChild(row);
  }
  showtruefalse(){
     this.istruefalse=true;
      this.ismcq=false;
  }
  showmcq(){
    this.istruefalse=false;
      this.ismcq=true;
  }

  next()
{
  if(this.subnameProp==null){
    // alert("fill compulsory field");

  }else if( this.examinerProp==null){
    // alert("fill compulsory field");
  }else{
    this.isgood=true;
  }
}

savesub(){
  alert(localStorage.getItem('id'));
  this.ds.savesub({subname:this.subnameProp,subcode:this.subcodeProp,examiner:this.examinerProp})
  .subscribe((response)=>{
    if(response.status=="ok"){
      alert(response.data);
    }else{
      alert(response.data);
    }
  })
 
}

}
