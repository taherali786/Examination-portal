import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  nameProp;
  emailProp;
  mobProp;
  passwordProp;
  roleProp;
  constructor(private router:Router,private ds:DataService) { }

  ngOnInit(): void {
  
  }

  ngViewAfterInIt():void{
    document.getElementById('clickevent').click();
  }
    
  signup()
  {  
    this.ds.signup({name:this.nameProp,email:this.emailProp,mobile:this.mobProp,password:this.passwordProp,role:this.roleProp})
    .subscribe((response)=>{
      if(response.status=="ok")
      {
       alert("you are successfully registered");
     
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
    
         
         this.router.navigate(['/login']);
      }else{
        alert(" You Are Not Registered");
      }
    })
  }
  
}
