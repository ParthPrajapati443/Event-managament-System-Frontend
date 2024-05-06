import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  //url = `http://192.168.1.36:8078/`;
  //url = `http://localhost:50291/`;
  url = environment.apiUrl;
  constructor(private http: HttpClient) { }

  AddEvent(data: any) {
    const endPoint = `api/Admin/AddEvent`;
    const headerOptions = {
      "Content-Type": "application/json"
    };
    return this.http.post(this.url + endPoint, data, { headers: headerOptions });
  }

  GetEvent(data: any) {
    const endPoint = `api/Admin/GetEvent`;
    const headerOptions = {
      "Content-Type": "application/json"
    };
    return this.http.post(this.url + endPoint, data, { headers: headerOptions });
  }

  UpdateEvent(data: any) {
    const endPoint = `api/Admin/UpdateEvent`;
    const headerOptions = {
      "Content-Type": "application/json"
    };
    return this.http.post(this.url + endPoint, data, { headers: headerOptions });
  }

  DeleteEvent(data: any) {
    const endPoint = `api/Admin/DeleteEvent`;
    const headerOptions = {
      "Content-Type": "application/json"
    };
    return this.http.post(this.url + endPoint, data, { headers: headerOptions });
  }

  AddActivity(data: any) {
    const endPoint = `api/Admin/Activity`;
    const headerOptions = {
      "Content-Type": "application/json"
    };
    return this.http.post(this.url + endPoint, data, { headers: headerOptions });
  }

  GetActivity(data: any) {
    const endPoint = `api/Admin/Activity`;
    const headerOptions = {
      "Content-Type": "application/json"
    };
    return this.http.post(this.url + endPoint, data, { headers: headerOptions });
  }

  UpdateActivity(data: any) {
    const endPoint = `api/Admin/Activity`;
    const headerOptions = {
      "Content-Type": "application/json"
    };
    return this.http.post(this.url + endPoint, data, { headers: headerOptions });
  }

  DeleteActivity(data: any) {
    const endPoint = `api/Admin/Activity`;
    const headerOptions = {
      "Content-Type": "application/json"
    };
    return this.http.post(this.url + endPoint, data, { headers: headerOptions });
  }

  Publish(data: any) {
    const endPoint = `api/Admin/PublishUnpublishEvent`;
    const headerOptions = {
      "Content-Type": "application/json"
    };
    return this.http.post(this.url + endPoint, data, { headers: headerOptions });
  }

  Unpublish(data: any) {
    const endPoint = `api/Admin/PublishUnpublishEvent`;
    const headerOptions = {
      "Content-Type": "application/json"
    };
    return this.http.post(this.url + endPoint, data, { headers: headerOptions });
  }
}
