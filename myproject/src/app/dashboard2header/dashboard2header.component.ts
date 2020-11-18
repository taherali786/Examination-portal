import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-dashboard2header',
  templateUrl: './dashboard2header.component.html',
  styleUrls: ['./dashboard2header.component.css']
})
export class Dashboard2headerComponent implements OnInit {
data:any=123;
encryted:string;
secretkey:string='Secret@123';
  constructor(private router:Router) { }
 
  ngOnInit(): void {
  
  }

  logout()
  {
    localStorage.removeItem("email");
    this.router.navigate(['/']);
  }

}
