import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { UserDarshboardComponent } from './user-darshboard/user-darshboard.component';
import { AdminDarshboardComponent } from './admin-darshboard/admin-darshboard.component';
import { UserSignUpComponent } from './user-sign-up/user-sign-up.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddEventComponent } from './add-event/add-event.component';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { PublishComponent } from './publish/publish.component';
import { AdmoinNavbarComponent } from './admoin-navbar/admoin-navbar.component';
import { UpdateActivityComponent } from './update-activity/update-activity.component';
import { UpdateEventComponent } from './update-event/update-event.component';
import { AdminViewEventComponent } from './admin-view-event/admin-view-event.component';
//import { UserViewEventComponent } from './user-view-event/user-view-event.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserDarshboardComponent,
    AdminDarshboardComponent,
    UserSignUpComponent,
    PageNotFoundComponent,
    AddEventComponent,
    AddActivityComponent,
    PublishComponent,
    AdmoinNavbarComponent,
    UpdateActivityComponent,
    UpdateEventComponent,
    AdminViewEventComponent,
    //UserViewEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
