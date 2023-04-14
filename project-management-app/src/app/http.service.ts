import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { NgForm } from '@angular/forms';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) { }

  URL: string = 'https://final-task-backend-production-c527.up.railway.app/';
  ending: string = "";

  postData(form: NgForm) {
    this.ending = "auth/signup";
    const body = { name: form.value.name, login: form.value.login, password: form.value.password };
    return this.http.post(this.URL + this.ending, body);
  }

}
