import { Component } from '@angular/core';
import { RegistrationService } from '../Services/registration.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-sign-up',
  templateUrl: './user-sign-up.component.html',
  styleUrls: ['./user-sign-up.component.css']
})
export class UserSignUpComponent {
  signUpForm:any = FormGroup;
  submitted = false;

  constructor( private formBuilder: FormBuilder, private router: Router,private registrationService : RegistrationService){
    //SignUp form validations
    this.signUpForm = this.formBuilder.group({
      Flag:['INSERT'],
      UserName: ['', [Validators.required, Validators.maxLength(20), Validators.pattern("[a-zA-Z][a-zA-Z ]+")]],
      UserEmail: ['', [Validators.required, Validators.email, Validators.maxLength(30), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      UserPassword: ['', [Validators.required, Validators.maxLength(15), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$')]],
      UserMobile:['', [Validators.required, Validators.min(1000000000), Validators.max(9999999999), Validators.maxLength(10), Validators.pattern("^[0-9]{10}$")]]
      });
  }

  OnlyNumber(key : any){
    const e = key.charCode;
    //console.log(e);
    if(!(e>=48 && e<=57)){
      //alert("invaled input");
      return false;
    }
    return e>=48 && e<=57
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

  //user form actions
  get f() { return this.signUpForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.signUpForm.invalid) {
        return;
    }
    //True if all the fields are filled
    else{
      this.registrationService.SignUp(this.signUpForm.value).subscribe((data: any)=>{console.log(data)
        if(data != null && data != "" && data != undefined){
            if(data.ID == 200 && data.Message == "200|Insertes Successfully") {
              sessionStorage.setItem("Email",data.EmailID);
              sessionStorage.setItem("ID",data.UserID);
              sessionStorage.setItem("Role","User");
              this.router.navigateByUrl('/UserDashboard');
              alert("Successfull Sign Up as User");
            }
            else if(data.ID == 400 && data.Message == "400|Already Exist"){
              alert("Please Login.");
              this.router.navigateByUrl('/Login');
            }
          }
        else{
          alert("Try Again.");
          }
        }
      )
    }
  }
}
