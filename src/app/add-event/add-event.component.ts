import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../Services/admin.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {

addEventForm:any = FormGroup;
result! : Event[];
submitted = false;
Base64! : string;
constructor( private formBuilder: FormBuilder, private adminService : AdminService){
  //add event form validations
  this.addEventForm = this.formBuilder.group({
    EventName: ['', [Validators.required, Validators.maxLength(20), Validators.pattern("[a-zA-Z][a-zA-Z ]+")]],
    EventStartDate: ['', [Validators.required]],
    EventEndDate: ['', [Validators.required]],
    EventDiscription: ['', [Validators.required, Validators.maxLength(300)]],
    EventAddress: ['', [Validators.required, Validators.maxLength(200)]],
    EventImage: ['' , [Validators.required]]
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

OnlyAlphabat(key : any){
  const e = key.charCode;
  //console.log(e);
  if(!(e>=97 && e<=122) && !(e>=65 && e<=90) && e!=32){
    //alert("invaled input");
    return false;
  }
  return (e>=97 && e<=122) || (e>=65 && e<=90) || e==32
}

get f() { return this.addEventForm.controls; }
 
onSubmit() {
  this.submitted = true;
  // stop here if form is invalid
  if (this.addEventForm.invalid) {
      return;
  }
  //True if all the fields are filled
  else{
    const body = {
      "EventName": this.addEventForm.value.EventName,
      "EventStartDate": this.addEventForm.value.EventStartDate,
      "EventEndDate": this.addEventForm.value.EventEndDate,
      "EventDiscription": this.addEventForm.value.EventDiscription,
      "EventAddress": this.addEventForm.value.EventAddress,
      "EventCreatedBy": sessionStorage.getItem("ID"),
      "EventImage": this.Base64,
      "Flag": "Insert"
    };
    this.adminService.AddEvent(body).subscribe((data: any)=>{
      if(data != null && data != "" && data != undefined){
        if(data.ID == 200 && data.Message == "200|Event successfully added") {
          this.addEventForm.reset();
          alert("Event added");
        }
        else if(data.ID == 400 && data.Message == "400|Event not added"){
          alert("Event not added");
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
  const file = event.target.files[0];
  this.addEventForm.get('EventImage').setErrors(null);
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
      this.addEventForm.get('EventImage').setErrors({sizeExceeded:true});
      alert("please select file which have size less than 2mb");
    }
  }
    else {
      alert("please select valid type.. Jpeg,png or svg");
      this.addEventForm.get('EventImage').setErrors({invalidTye:true});
      this.addEventForm.value.image = null;
    }
  }
}
