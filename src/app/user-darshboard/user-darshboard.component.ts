import { Component } from '@angular/core';
import { RegistrationService } from '../Services/registration.service';
import { GetEvent } from '../Models/getEvent';
import { Router } from '@angular/router';
import { AdminService } from '../Services/admin.service';
import { Activity } from '../Models/Activity';

@Component({
  selector: 'app-user-darshboard',
  templateUrl: './user-darshboard.component.html',
  styleUrls: ['./user-darshboard.component.css']
})
export class UserDarshboardComponent {

  getEvent! : GetEvent[];
  activity! : Activity[];
  showActivity = false;
  index = 0;
  id! : number;
  message! : string;
  constructor(private registrationService : RegistrationService,private eventService : AdminService, private router: Router){}

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

  GetEvent(){
    const Json = {
      "Flag":"Published"
    }
    this.eventService.GetEvent(Json).subscribe((data: any)=>{
        if(data != null && data != "" && data != undefined){
              this.getEvent = data.ArrayOfResponse;
          }
        else{
          alert("There Is No Event Right Now.");
          }
        }
      )
  }

  ViewActivity(eventID: number){
    this.router.navigateByUrl("UserDashboard/UserViewEvent/"+eventID)
    // const body = {
    //   "EventID": eventID,
    //   "Flag":"ViewWithPublish"
    // }
    // this.eventService.GetActivity(body).subscribe((response: any)=>{
    //     if(response != null && response != "" && response != undefined){
    //       this.activity = response.ArrayOfResponse;
    //       if(this.activity.length > 0){
    //         this.showActivity = true;
    //         this.id = eventID;
    //         this.message = "Scrolldown to view activity";
    //       }
    //       else{
    //         this.showActivity = false;
    //         this.id = eventID;
    //         this.message = "There is no activity right now.";
    //       }
    //       }
    //     else{
    //       alert("There is no activity right now.");
    //       }
    //     }
    // )
  }

  ngOnInit() {
   this.GetEvent();
  }
}
