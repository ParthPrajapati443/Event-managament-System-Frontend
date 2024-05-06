import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GetEvent } from '../Models/getEvent';
import { AdminService } from '../Services/admin.service';
import { Activity } from '../Models/Activity';

@Component({
  selector: 'app-admin-darshboard',
  templateUrl: './admin-darshboard.component.html',
  styleUrls: ['./admin-darshboard.component.css']
})

export class AdminDarshboardComponent {

  getEvent!: GetEvent[];
  activity!: Activity[];
  show = false;
  index = 0;
  id!: number;
  message!: string;
  constructor(private adminService: AdminService, private router: Router) { }

  ViewEvent(eventID: number) {
    this.router.navigateByUrl('/AdminViewEvent/' + eventID);
  }

  ViewActivity(eventID: number) {
    const body = {
      "EventID": eventID,
      "Flag": "ViewWithPublish"
    }
    this.adminService.GetActivity(body).subscribe((response: any) => {
      if (response != null && response != "" && response != undefined) {
        this.activity = response.ArrayOfResponse;
        if (this.activity.length > 0) {
          this.show = true;
          this.id = eventID;
          this.message = "Scrolldown to view activity";
        }
        else {
          this.show = false;
          this.id = eventID;
          this.message = "There is no activity right now.";
        }
      }
      else {
        alert("There is no activity right now.");
      }
    }
    )
  }

  GetEvent() {
    const Data = {
      "EventCreatedBy": sessionStorage.getItem("ID"),
      "Flag": "ViewWithPublish"
    }
    this.adminService.GetEvent(Data).subscribe((response: any) => {
      if (response != null && response != "" && response != undefined) {
        this.getEvent = response.ArrayOfResponse;
      }
      else {
        alert("There Is No Event Right Now.");
      }
    }
    )
  }

  Unpublish(eventID: number) {
    const body = {
      "EventID": eventID,
      "Flag": "Unpublish"
    }
    this.adminService.Unpublish(body).subscribe((response: any) => {
      if (response != null && response != "" && response != undefined) {
        if (response.ID == 200 && response.Message == "200|Event Unpublished") {
          this.ngOnInit();
          alert("Event Unpublished");
        }
        else if (response.ID == 400 && response.Message == "400|Event not Unpublished") {
          alert("Event not Unpublished");
        }
      }
      else {
        alert("Try Again!");
      }
    }
    )
  }

  ngOnInit() {
    this.GetEvent();
  }
}
