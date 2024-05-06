import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, MinValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../Services/admin.service';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})

export class AddActivityComponent {

  addActivityForm: any = FormGroup;
  result!: any;
  submitted = false;
  min!: any;
  max!: any;

  constructor(private formBuilder: FormBuilder, private event: AdminService, private router: Router) {
    //Add activity form validations
    this.addActivityForm = this.formBuilder.group({
      EventName: ['', [Validators.required]],
      ActivityName: ['', [Validators.required, Validators.maxLength(20), Validators.pattern("[a-zA-Z][a-zA-Z ]+")]],
      ActivityStartDate: ['', [Validators.required]],
      ActivityEndDate: ['', [Validators.required]],
      ActivityDiscription: ['', [Validators.required, Validators.maxLength(300)]],
      ActivityPrice: ['', [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]],
    });
  }

  get f() { return this.addActivityForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.addActivityForm.invalid) {
      return;
    }
    else {
      const activity = {
        "ActivityName": this.addActivityForm.value.ActivityName,
        "ActivityStartDate": this.addActivityForm.value.ActivityStartDate,
        "ActivityEndDate": this.addActivityForm.value.ActivityEndDate,
        "ActivityDiscription": this.addActivityForm.value.ActivityDiscription,
        "ActivityPrice": this.addActivityForm.value.ActivityPrice,
        "EventID": this.addActivityForm.value.EventName,
        "Flag": "Insert"
      }
      this.event.AddActivity(activity).subscribe((data: any) => {
        if (data != null && data != "" && data != undefined) {
          if (data.ID == 200 && data.Message == "200|Activity successfully added") {
            alert("Activity added");
            this.addActivityForm.reset();
          }
          else if (data.ID == 400 && data.Message == "400|Activity not added") {
            alert("Activity not added");
          }
        }
        else {
          this.addActivityForm.reset();
          alert("Try Again.");
        }
      }
      )
    }
  }

  GetEvent() {
    const Data = {
      "EventCreatedBy": sessionStorage.getItem("ID"),
      "Flag": "ViewWithoutPublish"
    }
    this.event.GetEvent(Data).subscribe((data: any) => {
      if (data != null && data != "" && data != undefined) {
        this.result = data.ArrayOfResponse;
      }
      else {
        alert("There Is No Event Right Now.");
      }
    }
    )
  }

  ChangeDate() {
    let id = this.addActivityForm.value.EventName;
    this.result.forEach((element: any) => {
      if (element.EventID == id) {
        const min1 = element.EventStartDate.toString().split(" ");
        this.min = min1[0].toString().split("-").reverse().join("-") + " " + min1[1].toString().substring(0, 5);
        const max1 = element.EventEndDate.toString().split(" ");
        this.max = max1[0].toString().split("-").reverse().join("-") + " " + max1[1].toString().substring(0, 5);
      }
    });
  }

  OnlyNumber(key: any) {
    const e = key.charCode;
    //console.log(e);
    if (!(e >= 48 && e <= 57) && e != 46) {
      //alert("invaled input");
      return false;
    }
    return e >= 48 && e <= 57 || e == 46
  }

  OnlyAlphabat(key: any) {
    const e = key.charCode;
    //console.log(e);
    if (!(e >= 97 && e <= 122) && !(e >= 65 && e <= 90) && e != 32) {
      //alert("invaled input");
      return false;
    }
    return (e >= 97 && e <= 122) || (e >= 65 && e <= 90) || e == 32
  }

  ngOnInit() {
    this.GetEvent();
  }

}
