import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { $, $$ } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailProp;
  passwordProp;
  constructor(private router:Router, private ds:DataService) { }

  ngOnInit(): void {
    document.getElementById('clickevent2').click();
  }

  signin()
  {
   
    this.ds.signin({email:this.emailProp})
    .subscribe((response)=>{
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

      if(response.data[0].role=="teacher"){
        //alert(response.data[0]._id);
        localStorage.setItem("id",response.data[0]._id);
        localStorage.setItem("name",response.data[0].name);
        localStorage.setItem("email",response.data[0].email);
        localStorage.setItem("role",response.data[0].role);
        alert(localStorage.getItem('id')+localStorage.getItem('name')+localStorage.getItem('email')+localStorage.getItem('role'));
        alert("you are login");
        this.router.navigate(['/dashboard']);
      }else{
        localStorage.setItem("id",response.data[0]._id);
        localStorage.setItem("name",response.data[0].name);
        localStorage.setItem("email",response.data[0].email);
        localStorage.setItem("role",response.data[0].role);
        alert("you are login");
        this.router.navigate(['/dashboard2']);
      }
      
  
      }else{
        alert(response.err);
      }
    })
   
  }

}
