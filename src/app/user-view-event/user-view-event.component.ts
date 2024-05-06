import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../Services/admin.service';
import { RegistrationService } from '../Services/registration.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
//  @NgModule({
//      imports: [BrowserModule ]
//   })
 
@Component({
  standalone: true,
  selector: 'app-user-view-event',
  templateUrl: './user-view-event.component.html',
  styleUrls: ['./user-view-event.component.css'],
  imports: [  CommonModule ]
})
export class UserViewEventComponent {
  event! : any;
  activity! : any;
  eventId! : number;
  show = false;
  index = 0;
  id! : number;
  message! : string;
  constructor(private adminService : AdminService, private router: Router, private route: ActivatedRoute, private registrationService: RegistrationService){
    this.eventId = this.route.snapshot.params['eventid'];
  }

  Logout(){
    const body = {
      "EmailID" : sessionStorage.getItem("Email")
    }
    this.registrationService.LogOut(body).subscribe((data: any)=>{
      if(data != null && data != "" && data != undefined){
          if(data.code == 200 && data.Message == "200|Successfull Logout as User") {
            sessionStorage.clear();
            alert("Successfull Logout");
            this.router.navigateByUrl('/Login');
          }
          else{
            alert("Unsuccessfull Logout, TryAgain")
          }
        }
      else{
        alert("TryAgain");
        }
      }
    )
  }
  
  ViewActivity(eventId: number){
    const body = {
      "EventID": eventId,
      "Flag":"ViewWithPublish"
    }
    this.adminService.GetActivity(body).subscribe((response: any)=>{
      if(response != null && response != "" && response != undefined ){
        this.activity = response.ArrayOfResponse;
        //console.log(this.activity)
          if(this.activity.length > 0){
            this.show = true;
          }
          else{
            this.show = false;
            this.message = "There is no activity.";
          }
        }
      else{
        alert("There is no activity right now.");
        }
      }
    )
  }

  GetEvent(){
    const Data = {
      "EventID": this.eventId,
      "Flag":"GetEventForView"
    }
    this.adminService.GetEvent(Data).subscribe((response: any)=>{
      if(response != null && response != "" && response != undefined){
        this.event = response.ArrayOfResponse;
        //console.log(this.event)
      }
      else{
        alert("There Is No Event Right Now.");
      }
    }
    )
  }

  Onclick(){
    this.router.navigateByUrl("UserDashboard");
  }
  
  ngOnInit() {
    this.GetEvent();
    this.ViewActivity(this.eventId)
  }
}
