import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-showallresult',
  templateUrl: './showallresult.component.html',
  styleUrls: ['./showallresult.component.css']
})
export class ShowallresultComponent implements OnInit {
post;
total;
rightanswer;
  constructor(private ds:DataService,private router:Router) { }

  ngOnInit(): void {
    this.ds.showallresult({userid:localStorage.getItem('id')}).subscribe((response)=>{
      if(response.status=="ok"){
        this.post=response.data;
      }else{
          alert(response.data);
      }
    })
  }
  edittext(title:string,title2:string){
    this.router.navigate(['/dashboard/viewallresult'],{queryParams:{subname:title,examiner:title2}});
  }
}
