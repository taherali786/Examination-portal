import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboardheader',
  templateUrl: './dashboardheader.component.html',
  styleUrls: ['./dashboardheader.component.css']
})
export class DashboardheaderComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    //alert(Math.floor(Math.random()*10000000000+1));
  }

  logout()
  {
    localStorage.removeItem("email");
    this.router.navigate(['/']);
  }

    
  

}
