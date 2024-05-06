import { NgModule, importProvidersFrom } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserDarshboardComponent } from './user-darshboard/user-darshboard.component';
import { AdminDarshboardComponent } from './admin-darshboard/admin-darshboard.component';
import { UserSignUpComponent } from './user-sign-up/user-sign-up.component';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { AddEventComponent } from './add-event/add-event.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PublishComponent } from './publish/publish.component';
import { AuthGaurdGuard } from './auth-gaurd.guard';
import { UpdateEventComponent } from './update-event/update-event.component';
import { UpdateActivityComponent } from './update-activity/update-activity.component';
import { AdminViewEventComponent } from './admin-view-event/admin-view-event.component';
import { UserViewEventComponent } from './user-view-event/user-view-event.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'Login', component: LoginComponent },
  { path: 'SignUp', component: UserSignUpComponent },
  { path: 'UserDashboard', component: UserDarshboardComponent, canActivate: [AuthGaurdGuard], data: { Role: "User" } },
  { path: 'UserDashboard/UserViewEvent/:eventid', loadComponent: () => import('./user-view-event/user-view-event.component').then(mod => mod.UserViewEventComponent),canActivate: [AuthGaurdGuard], data: { Role: "User" } },
  { path: 'AdminDashboard', component: AdminDarshboardComponent, canActivate: [AuthGaurdGuard], data: { Role: "Admin" } },
  { path: 'AdminViewEvent/:eventid', component: AdminViewEventComponent, canActivate: [AuthGaurdGuard], data: { Role: "Admin" } },
  { path: 'AddEvent', component: AddEventComponent, canActivate: [AuthGaurdGuard], data: { Role: "Admin" } },
  { path: 'AddActivity', component: AddActivityComponent, canActivate: [AuthGaurdGuard], data: { Role: "Admin" } },
  { path: 'Publish', component: PublishComponent, canActivate: [AuthGaurdGuard], data: { Role: "Admin" } },
  { path: 'UpdateEvent/:eventid', component: UpdateEventComponent, canActivate: [AuthGaurdGuard], data: { Role: "Admin" } },
  { path: 'UpdateActivity/:activityid/:eventid', component: UpdateActivityComponent, canActivate: [AuthGaurdGuard], data: { Role: "Admin" } },
  { path: '', redirectTo: '/Login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
