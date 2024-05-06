import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../Services/admin.service';
import { Activity } from '../Models/Activity';

@Component({
  selector: 'app-update-activity',
  templateUrl: './update-activity.component.html',
  styleUrls: ['./update-activity.component.css']
})
export class UpdateActivityComponent {
  UpdateActivityForm:any = FormGroup;
  submitted = false;
  result! : any ;
  min! : any;
  max! : any;
  activityId! : number;
  eventId! : number;
 
  constructor( private formBuilder: FormBuilder, private adminService : AdminService, private router: Router, private route: ActivatedRoute){
    this.activityId = this.route.snapshot.params['activityid'];
    this.eventId = this.route.snapshot.params['eventid'];
    //Add activity form validations
    this.UpdateActivityForm = this.formBuilder.group({
      //EventName: ['', [Validators.required]],
      ActivityName: [this.UpdateActivityForm["ActivityName"], [Validators.required, Validators.maxLength(20), Validators.pattern("[a-zA-Z][a-zA-Z ]+")]],
      ActivityStartDate: ['', [Validators.required]],
      ActivityEndDate: ['', [Validators.required]],
      ActivityDiscription: ['', [Validators.required, Validators.maxLength(300)]],
      ActivityPrice: ['', [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]],
    });
   
  }
  
  get f() { return this.UpdateActivityForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.UpdateActivityForm.invalid) {
        return;
    }
    else{
      const activity = {
        "ActivityID": this.activityId,
        "ActivityName": this.UpdateActivityForm.value.ActivityName,
        "ActivityStartDate": this.UpdateActivityForm.value.ActivityStartDate,
        "ActivityEndDate": this.UpdateActivityForm.value.ActivityEndDate,
        "ActivityDiscription": this.UpdateActivityForm.value.ActivityDiscription,
        "ActivityPrice": this.UpdateActivityForm.value.ActivityPrice,
        "Flag": "Update"
      }
      this.adminService.UpdateActivity(activity).subscribe((data: any)=>{
        if(data != null && data != "" && data != undefined){
          if(data.ID == 200 && data.Message == "200|Activity Updated") {
            alert("Activity Updated");
            this.UpdateActivityForm.reset();
            this.router.navigateByUrl("/Publish")
          }
          else if(data.ID == 400 && data.Message == "400|Activity not Updated"){
            alert("Activity not Updated");
          }
        }
        else{
          this.UpdateActivityForm.reset();
          alert("Try Again.");
          }
        }
      )
    }
  }

  GetActivity(){
    const body = {
      "ActivityID": this.activityId,
      "Flag":"GetActivity"
    }
    this.adminService.GetActivity(body).subscribe((data: any)=>{
      if(data != null && data != "" && data != undefined){
        this.result = data.ArrayOfResponse[0];
        //console.log( data.ArrayOfResponse[0].ActivityStartDate);
          this.UpdateActivityForm.patchValue({
            ActivityName: this.result.ActivityName,
            ActivityStartDate: this.result.ActivityStartDate,
            ActivityEndDate: this.result.ActivityEndDate,
            ActivityDiscription: this.result.ActivityDiscription,
            ActivityPrice: this.result.ActivityPrice
          });
        }
      else{
        alert("There Is No Activity Right Now.");
        }
      }
    )
  }

  GetEvent(){
    const body1 = {
      "EventID": this.eventId,
      "Flag":"GetEvent"
    }
    this.adminService.GetEvent(body1).subscribe((data: any)=>{
      if(data != null && data != "" && data != undefined){
          this.result = data.ArrayOfResponse[0];
          const min1 = this.result.EventStartDate.toString().split("T");
          this.min = (min1[0].split("-").reverse().join("-")) + " " + (min1[1].substring(0,5));
          const max1 = this.result.EventEndDate.toString().split("T");
          this.max = max1[0].split("-").reverse().join("-") + " " + max1[1].substring(0,5);
        }
      else{
        alert("There Is No Event Date and Time Right Now.");
        }
      }
    )
  }

  OnlyNumber(key : any){
    const e = key.charCode;
    //console.log(e);
    if(!(e>=48 && e<=57) && e!=46){
      //alert("invaled input");
      return false;
    }
    return e>=48 && e<=57 || e==46
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
    this.GetActivity();
    this.GetEvent();
  }
}
