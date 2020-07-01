import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { CourseComponent } from './course/course.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { CreatetestComponent } from './createtest/createtest.component';
import { JointestComponent } from './jointest/jointest.component';
import { WebsiteComponent } from './website/website.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutComponent } from './logout/logout.component';
import { UserauthGuard } from './userauth.guard';
import { CreateqbankComponent } from './createqbank/createqbank.component';
import { ShowresultComponent } from './showresult/showresult.component';
import { AddpartComponent } from './addpart/addpart.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { ShowqbankComponent } from './showqbank/showqbank.component';
import { AddnewqueComponent } from './addnewque/addnewque.component';
import { ShowdetailComponent } from './showdetail/showdetail.component';
import { ShowpaperComponent } from './showpaper/showpaper.component';
import { ShowpaperdetailComponent } from './showpaperdetail/showpaperdetail.component';
import { JointestdetailComponent } from './jointestdetail/jointestdetail.component';
import { ShowqdetailComponent } from './showqdetail/showqdetail.component';


const routes: Routes = [
  {path:'',component:WebsiteComponent,children:[
    {path:'',component:HomeComponent},
    {path:'header',component:HeaderComponent},
    {path:'about',component:AboutComponent},
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
    {path:'createqbank',component:CreateqbankComponent},
    {path:'createtest',component:CreatetestComponent},
    {path:'showresult',component:ShowresultComponent},
    {path:'showpaper',component:ShowpaperComponent},
    {path:'showpaperdetail',component:ShowpaperdetailComponent}
  ]},
  {path:'dashboard2',component:Dashboard2Component ,canActivate:[UserauthGuard],children:[
    {path:'',component:JointestComponent},
    {path:'jointestdetail',component:JointestdetailComponent},
    {path:'showqbank',component:ShowqbankComponent},
    {path:'showresult',component:ShowresultComponent}
  ]}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
