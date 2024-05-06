import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../Services/registration.service';

@Component({
  selector: 'app-admoin-navbar',
  templateUrl: './admoin-navbar.component.html',
  styleUrls: ['./admoin-navbar.component.css']
})
export class AdmoinNavbarComponent {

  constructor(private registrationService : RegistrationService, private router: Router){}
  Logout(){
    const body = {
      "EmailID" : sessionStorage.getItem("Email")
    }
    this.registrationService.LogOut(body).subscribe((data: any)=>{
      if(data != null && data != "" && data != undefined){
        if(data.code == 200 && data.Message == "200|Successfull Logout as Admin") {
          sessionStorage.clear();
          alert("Successfull Logout");
          this.router.navigateByUrl('/Login');
        }
        else{
          alert("Unsuccessfull Logout")
        }
      }
      else{
        alert("TryAgain");
        }
      }
    )
  }
}
