import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  //url = `http://192.168.1.36:8078/`;
  //url = `http://localhost:50291/`;
  url = environment.apiUrl;
  constructor(private http: HttpClient) { }

  Login(data: any) {
    const endPoint = `api/Registration/Login`
    const headerOptions = {
      "Content-Type": "application/json"
    };
    return this.http.post(this.url + endPoint, data, { headers: headerOptions });
  }

  SignUp(data: any) {
    const endPoint = `api/Registration/SignUp`;
    const headerOptions = {
      "Content-Type": "application/json"
    };
    return this.http.post(this.url + endPoint, data, { headers: headerOptions });

  }

  LogOut(data: any) {
    const endPoint = `api/Registration/Logout`;
    const headerOptions = {
      "Content-Type": "application/json"
    };
    return this.http.post(this.url + endPoint, data, { headers: headerOptions });

  }

}
