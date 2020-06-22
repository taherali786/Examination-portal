import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createqbank',
  templateUrl: './createqbank.component.html',
  styleUrls: ['./createqbank.component.css']
})
export class CreateqbankComponent implements OnInit {
  
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

goto()
{
  this.router.navigate(['/addnewque']);
}



}
