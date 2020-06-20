import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CourseComponent } from './course/course.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { JsComponent } from './js/js.component';
import { HtmlComponent } from './html/html.component';
import { CssComponent } from './css/css.component';
import { CreatetestComponent } from './createtest/createtest.component';
import { JointestComponent } from './jointest/jointest.component';
import { CustomcardComponent } from './customcard/customcard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardheaderComponent } from './dashboardheader/dashboardheader.component';
import { WebsiteComponent } from './website/website.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CourseComponent,
    AboutComponent,
    ContactComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    AccountComponent,
    JsComponent,
    HtmlComponent,
    CssComponent,
    CreatetestComponent,
    JointestComponent,
    CustomcardComponent,
    DashboardComponent,
    DashboardheaderComponent,
    WebsiteComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
