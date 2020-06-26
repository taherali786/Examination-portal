import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard2header',
  templateUrl: './dashboard2header.component.html',
  styleUrls: ['./dashboard2header.component.css']
})
export class Dashboard2headerComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  logout()
  {
    localStorage.removeItem("email");
    this.router.navigate(['/']);
  }

}
