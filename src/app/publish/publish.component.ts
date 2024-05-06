import { Component } from '@angular/core';
import { Event } from '../Models/Event';
import { AdminService } from '../Services/admin.service';
import { Activity } from '../Models/Activity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent {

  event! : Event[];
  activity! : Activity[];
  show = false;
  index = 0;
  message! : string;
  id! : number;
  constructor(private adminService : AdminService, private router : Router){}

  GetEvent(){
    const data = {
      "EventCreatedBy": sessionStorage.getItem("ID"),
      "Flag":"ViewWithoutPublish"
    }
    this.adminService.GetEvent(data).subscribe((response: any)=>{
      if(response != null && response != "" && response != undefined){
        this.event = response.ArrayOfResponse;
        }
      else{
        alert("There Is No Event Right Now.");
        }
      }
    )
  }
  
  ViewActivity(eventID: number){
    const body = {
      "EventID": eventID,
      "Flag":"ViewActivity"
    }
    this.adminService.GetActivity(body).subscribe((response: any)=>{
      if(response != null && response != "" && response != undefined){
        this.activity = response.ArrayOfResponse;
          if(this.activity.length > 0){
            this.show = true;
            this.id = eventID;
            this.message = "Scrolldown to view activity";
          }
          else{
            this.show = false;
            this.id = eventID;
            this.message = "There is no activity right now.";
          }
        }
      else{
        alert("There is no activity right now.");
        }
      }
    )
  }

  Publish(eventID: number){
    const body = {
      "EventID": eventID,
      "Flag":"Publish"
    }
    this.adminService.Publish(body).subscribe((response: any)=>{
      if(response != null && response != "" && response != undefined){
        if(response.ID == 200 && response.Message == "200|Event published") {
          this.ngOnInit();
          alert("Event published");
        }
        else if(response.ID == 400 && response.Message == "400|Event not published"){
          alert("Event not published");
        }
      }
      else{
        alert("Try Again!");
        }
      }
    )
  }

  UpdateActivity(activityID: number,EventID: number){
    this.router.navigateByUrl('/UpdateActivity/'+activityID+'/'+EventID);
  }

  DeleteActivity(activityID:number){
    const body = {
      "ActivityID": activityID,
      "Flag":"Delete"
    }
    this.adminService.DeleteActivity(body).subscribe((response: any)=>{
      if(response != null && response != "" && response != undefined){
        if(response.ID == 200 && response.Message == "200|Activity Deleted") {
          this.ViewActivity(response.EventID);
          alert("Activity Deleted");
        }
        else if(response.ID == 400 && response.Message == "400|Activity not Deleted"){
          alert("Activity not Deleted");
        }
      }
      else{
        alert("Try Again!");
        }
      }
    )
  }

  UpdateEvent(EventID: number){
    if (confirm("If you are update details then your old activity of this event is delete")) {
        this.router.navigateByUrl('/UpdateEvent/'+EventID);
    }
    return false;
  }

  DeleteEvent(EventID:number){
    const body = {
      "EventID": EventID,
      "Flag":"Delete"
    }
    this.adminService.DeleteEvent(body).subscribe((response: any)=>{
      if(response != null && response != "" && response != undefined){
        if(response.ID == 200 && response.Message == "200|Event Deleted") {
          this.ngOnInit();
          alert("Event Deleted");
        }
        else if(response.ID == 400 && response.Message == "400|Event not Deleted"){
          alert("Event not Deleted");
        }
      }
      else{
        alert("Try Again!");
        }
      }
    )
  }

  ngOnInit() {
    this.GetEvent();
  }
}
