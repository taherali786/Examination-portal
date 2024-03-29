import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { CourseComponent } from './course/course.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { CreatetestComponent } from './createtest/createtest.component';
import { JointestComponent } from './jointest/jointest.component';
import { WebsiteComponent } from './website/website.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserauthGuard } from './userauth.guard';
import { CreateqbankComponent } from './createqbank/createqbank.component';
import { ShowresultComponent } from './showresult/showresult.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { ShowqbankComponent } from './showqbank/showqbank.component';
import { AddnewqueComponent } from './addnewque/addnewque.component';
import { ShowdetailComponent } from './showdetail/showdetail.component';
import { ShowpaperComponent } from './showpaper/showpaper.component';
import { ShowpaperdetailComponent } from './showpaperdetail/showpaperdetail.component';
import { JointestdetailComponent } from './jointestdetail/jointestdetail.component';
import { ShowqdetailComponent } from './showqdetail/showqdetail.component';
import { ShowallresultComponent } from './showallresult/showallresult.component';
import { ViewallresultComponent } from './viewallresult/viewallresult.component';
import { ViewresultComponent } from './viewresult/viewresult.component';
import { ShowqbankdetailComponent } from './showqbankdetail/showqbankdetail.component';
import { ResultcheckComponent } from './resultcheck/resultcheck.component';


const routes: Routes = [
  {path:'',component:WebsiteComponent,children:[
    {path:'',component:HomeComponent},
    {path:'header',component:HeaderComponent},
    {path:'contact',component:ContactComponent},
    {path:'login',component:LoginComponent},
    {path:'account',component:AccountComponent},
    {path:'jointest',component:JointestComponent}
  ]},
  {path:'dashboard',component:DashboardComponent,canActivate:[UserauthGuard], children:[
    {path:'',component:CreatetestComponent},
    {path:'addnewque',component:AddnewqueComponent},
    {path:'showqdetail',component:ShowqdetailComponent},
    {path:'showdetail',component:ShowdetailComponent},
    {path:'showallresult',component:ShowallresultComponent},
    {path:'viewallresult',component:ViewallresultComponent},
    {path:'createqbank',component:CreateqbankComponent},
    {path:'createtest',component:CreatetestComponent},
    {path:'showpaper',component:ShowpaperComponent},
    {path:'showpaperdetail',component:ShowpaperdetailComponent}
  ]},
  {path:'dashboard2',component:Dashboard2Component ,canActivate:[UserauthGuard],children:[
    {path:'',component:JointestComponent},
    {path:'jointestdetail',component:JointestdetailComponent},
    {path:'showqbank',component:ShowqbankComponent},
    {path:'showresult',component:ShowresultComponent},
    {path:'showqbankdetail',component:ShowqbankdetailComponent},
    {path:'viewresult',component:ViewresultComponent},
    {path:'resultcheck',component:ResultcheckComponent}
  ]}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
