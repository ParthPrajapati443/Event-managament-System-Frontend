import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../Services/admin.service';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent {
  
UpdateEventForm:any = FormGroup;
result! : any;
submitted = false;
Base64! : string;
eventId! : number;

constructor( private formBuilder: FormBuilder, private adminService : AdminService, private route: ActivatedRoute, private router: Router){
  this.eventId = this.route.snapshot.params['eventid'];
  //add event form validations
  this.UpdateEventForm = this.formBuilder.group({
    EventName: ['', [Validators.required, Validators.maxLength(20), Validators.pattern("[a-zA-Z][a-zA-Z ]+")]],
    EventStartDate: ['', [Validators.required]],
    EventEndDate: ['', [Validators.required]],
    EventDiscription: ['', [Validators.required, Validators.maxLength(300)]],
    EventAddress: ['', [Validators.required, Validators.maxLength(200)]],
    EventImage: ['']
    });
}

DateToday(): Date {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();
  return new Date(year, month, day, hour, minute);
}

get f() { return this.UpdateEventForm.controls; }

onSubmit() {
  this.submitted = true;
  // stop here if form is invalid
  if (this.UpdateEventForm.invalid) {
      return;
  }
  //True if all the fields are filled
  else{
    const body = {
      "EventID": this.eventId,
      "EventName": this.UpdateEventForm.value.EventName,
      "EventStartDate": this.UpdateEventForm.value.EventStartDate,
      "EventEndDate": this.UpdateEventForm.value.EventEndDate,
      "EventDiscription": this.UpdateEventForm.value.EventDiscription,
      "EventAddress": this.UpdateEventForm.value.EventAddress,
      "EventImage": this.Base64,
      "Flag": "Update"
    }
    this.adminService.UpdateEvent(body).subscribe((data: any)=>{
      if(data != null && data != "" && data != undefined){
        if(data.ID == 200 && data.Message == "200|Event successfully updated") {
          alert("Event updated");
          this.UpdateEventForm.reset();
          this.router.navigateByUrl("/Publish");
        }
        else if(data.ID == 400 && data.Message == "400|Event not updated"){
          alert("Event not updated");
          }
        }
      else{
        alert("Try Again.");
        }
      }
    )
  }
}
 
submit(event: any) {
  if(event != null && event != ""){
    const file = event.target.files[0];
    this.UpdateEventForm.get('EventImage').setErrors(null);
    if (event.target.files[0].type == "image/jpeg" || event.target.files[0].type == "image/png" || event.target.files[0].type == "image/svg+xml") {
      if (event.target.files[0].size < 2000000) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64: string = reader.result as string;
          this.Base64 = base64.split(',')[1];
        };
        if (file) {
          reader.readAsDataURL(file);
        }
      }
      else {
        this.UpdateEventForm.get('EventImage').setErrors({sizeExceeded:true});
        alert("please select file which have size less than 2mb");
      }
    }
      else {
        alert("please select valid type.. Jpeg,png or svg");
        this.UpdateEventForm.get('EventImage').setErrors({invalidTye:true});
        this.UpdateEventForm.value.image = null;
      }
  }
  else{
    this.Base64 = "";
  }
}
  
  GetEvent(){
    const body1 = {
      "EventID": this.eventId,
      "Flag":"GetEvent"
    }
    this.adminService.GetEvent(body1).subscribe((data: any)=>{
      if(data != null && data != "" && data != undefined){
        this.result =  data.ArrayOfResponse[0];
          //console.log(this.result);
          this.UpdateEventForm.patchValue({
            EventName: this.result.EventName,
            EventStartDate: this.result.EventStartDate,
            EventEndDate: this.result.EventEndDate,
            EventDiscription: this.result.EventDiscription,
            EventAddress: this.result.EventAddress,
            // EventImage: this.result.EventImage
          });
        }
      else{
        alert("There Is No Event Right Now.");
        }
      }
    )
  }

  OnlyAlphabat(key : any){
    const e = key.charCode;
    //console.log(e);
    if(!(e>=97 && e<=122) && !(e>=65 && e<=90) && e!=32){
      //alert("invaled input");
      return false;
    }
    return (e>=97 && e<=122) || (e>=65 && e<=90) || e==32
  }  
    
  ngOnInit() {
    this.GetEvent();
  }
}
