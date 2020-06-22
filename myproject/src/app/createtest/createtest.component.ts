import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createtest',
  templateUrl: './createtest.component.html',
  styleUrls: ['./createtest.component.css']
})
export class CreatetestComponent implements OnInit {
subnameProp;
subcodeProp;
examinerProp;
isgood=false;
  constructor(private router:Router) { }

  ngOnInit(): void {
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

  qbank(){
   this.router.navigate(['/createqbank'])
  }

  // savestep1(){

  // }
}
