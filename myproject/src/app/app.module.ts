import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HashLocationStrategy,LocationStrategy} from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CourseComponent } from './course/course.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { CreatetestComponent } from './createtest/createtest.component';
import { JointestComponent } from './jointest/jointest.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardheaderComponent } from './dashboardheader/dashboardheader.component';
import { WebsiteComponent } from './website/website.component';
import { CreateqbankComponent } from './createqbank/createqbank.component';
import { ShowresultComponent } from './showresult/showresult.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { Dashboard2headerComponent } from './dashboard2header/dashboard2header.component';
import { ShowqbankComponent } from './showqbank/showqbank.component';
import { AddnewqueComponent } from './addnewque/addnewque.component';
import { ShowdetailComponent } from './showdetail/showdetail.component';
import { ShowpaperComponent } from './showpaper/showpaper.component';
import { ShowpaperdetailComponent } from './showpaperdetail/showpaperdetail.component';
import { JointestdetailComponent } from './jointestdetail/jointestdetail.component';
import { ShowqdetailComponent } from './showqdetail/showqdetail.component';
import {CountdownModule} from 'ngx-countdown';
import { ShowallresultComponent } from './showallresult/showallresult.component';
import { ViewresultComponent } from './viewresult/viewresult.component';
import { ViewallresultComponent } from './viewallresult/viewallresult.component';
import { ShowqbankdetailComponent } from './showqbankdetail/showqbankdetail.component';
import * as CryptoJS from 'crypto-js';
import {BackButtonDisableModule} from 'angular-disable-browser-back-button';
import {SocketIoModule,SocketIoConfig,Socket} from 'ngx-socket-io';
import { ResultcheckComponent } from './resultcheck/resultcheck.component';

//import {CountdownTimerModule} from 'ngx-countdown-timer-date';

const config:SocketIoConfig={url:"http://3.134.86.110",options:{transports:['websocket','polling']}};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CourseComponent,
    ContactComponent,
    HeaderComponent,
    LoginComponent,
    AccountComponent,
    CreatetestComponent,
    JointestComponent,
    DashboardComponent,
    DashboardheaderComponent,
    WebsiteComponent,
    CreateqbankComponent,
    ShowresultComponent,
    Dashboard2Component,
    Dashboard2headerComponent,
    ShowqbankComponent,
    AddnewqueComponent,
    ShowdetailComponent,
    ShowpaperComponent,
    ShowpaperdetailComponent,
    JointestdetailComponent,
    ShowqdetailComponent,
    ShowallresultComponent,
    ViewresultComponent,
    ViewallresultComponent,
    ShowqbankdetailComponent,
    ResultcheckComponent ,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CountdownModule,
   // CountdownTimerModule.forRoot(),
   SocketIoModule.forRoot(config)
    //BackButtonDisableModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
