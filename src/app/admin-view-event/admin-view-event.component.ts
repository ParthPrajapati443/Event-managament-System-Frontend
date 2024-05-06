import { Component } from '@angular/core';
import { AdminService } from '../Services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-view-event',
  templateUrl: './admin-view-event.component.html',
  styleUrls: ['./admin-view-event.component.css']
})
export class AdminViewEventComponent {
  event! : any;
  activity! : any;
  eventId! : number;
  show = false;
  loder = false;
  index = 0;
  id! : number;
  message! : string;
  startDate! : any;
  endDate! : any;
  startTime! : any;
  endTime! : any;

  constructor(private adminService : AdminService, private router: Router, private route: ActivatedRoute){
    this.eventId = this.route.snapshot.params['eventid'];
  }
  
  ViewActivity(eventId: number){
    const body = {
      "EventID": eventId,
      "Flag":"ViewWithPublish"
    }
    this.adminService.GetActivity(body).subscribe((response: any)=>{
      if(response != null && response != "" && response != undefined ){
        this.activity = response.ArrayOfResponse;
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
        this.loder = true;
      }
      else{
        alert("There Is No Event Right Now.");
      }
    }
    )
  } 

  ngOnInit() {
    this.GetEvent();
    this.ViewActivity(this.eventId)
  }
}
