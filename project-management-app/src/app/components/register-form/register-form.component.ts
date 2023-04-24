import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { newUser } from '../../../assets/classes';
import { User } from '../../../assets/classes';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../http.service';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})

export class RegisterFormComponent {

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private httpService: HttpService) { }


  user: newUser = new newUser("", "", "");
  registeredUser: User = new User("", "", "");


  async goToSignIn() {
    await this.router.navigate(['/login'])
  }

  done: boolean = false;

  submit(form: NgForm) {

    this.httpService.postData(form)
      .subscribe({
        next: (data: any) => {

          localStorage.setItem('_id', data._id);
          localStorage.setItem('name', data.name);
          localStorage.setItem('login', data.login);

          localStorage.setItem('access_token', data.token);

          this.registeredUser._id = data._id;
          this.registeredUser.name = data.name;
          this.registeredUser.login = data.login;

          this.done = true;
          this.toastr.success("Congratulations! You are registered!");
        },
        error: (error: any) => {
          if (error.status === 409) {
            this.toastr.error("User with this Login is already exist!");
          }
          if (error.status === 400) {
            this.toastr.error("Oops. Looks like an Error. Try again, please!");
          }
        },

      });

  }
}
