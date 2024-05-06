import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../Services/registration.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
//login form variables
loginForm:any = FormGroup;
submitted = false;
constructor( private formBuilder: FormBuilder, private login: RegistrationService, private router: Router){
  sessionStorage.clear();
  //login form validations
  this.loginForm = this.formBuilder.group({
  EmailId: ['', [Validators.required, Validators.email, Validators.maxLength(30), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
  Password: ['', [Validators.required, Validators.maxLength(15),  
    Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$')]],
  Role: ['', [Validators.required]]
  });
}
//user form actions
get f() { return this.loginForm.controls; }

onSubmit() {
  this.submitted = true;
  // stop here if form is invalid
  if (this.loginForm.invalid) {
      return;
  }
  //True if all the fields are filled
  else{
    this.login.Login(this.loginForm.value).subscribe((data: any)=>{
      if(data != null && data != "" && data != undefined){
        if(data.code == 200 && data.Message == "200|Successfull Login as User") {
          sessionStorage.setItem("Email",data.Email);
          sessionStorage.setItem("ID",data.ID);
          sessionStorage.setItem("Role",this.loginForm.value.Role);
          sessionStorage.setItem("Islogin","true");
          alert("Successfull login as User");
          this.router.navigateByUrl('/UserDashboard');
        }
        else if (data.code == 400 && data.Message == "400|User does not exist"){
          alert("Please Sign Up");
          this.router.navigateByUrl('/SignUp');
        }
        else if (data.code == 200 && data.Message == "200|Successfull Login as Admin"){
          sessionStorage.setItem("Email",data.Email);
          sessionStorage.setItem("ID",data.ID);
          sessionStorage.setItem("Role",this.loginForm.value.Role);
          alert("Successfull Login as Admin");
          this.router.navigateByUrl('/AdminDashboard');
        }
        else if (data.code == 400 && data.Message == "400|Admin does not exist"){
          alert("Admin does not exist");
        }
      }
      else{
        alert("Try Again");
      }
    }
    )
  }
}
}
