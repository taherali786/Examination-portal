import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-viewallresult',
  templateUrl: './viewallresult.component.html',
  styleUrls: ['./viewallresult.component.css']
})
export class ViewallresultComponent implements OnInit {
examiner;
examsubject;
quesid;
subname;
  constructor(private route:ActivatedRoute,private ds:DataService) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((d)=>{
      this.examiner=d.get("examiner");
      this.examsubject=d.get("subname");
    })

    this.ds.viewallresult({examiner:this.examiner,examsubject:this.examsubject,examinerid:localStorage.getItem('id')}).subscribe((response)=>{

      if(response.status=="ok"){
       this.quesid=response.data;
      }else{
        alert(response.data);
      }
    })

  }

}
