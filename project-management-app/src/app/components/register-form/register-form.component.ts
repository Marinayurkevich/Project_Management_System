import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
    private http: HttpClient,
    private httpService: HttpService) { }


  user: User = new User("", "", "");



  async goToSignIn() {
    await this.router.navigate(['/login'])
  }

  submit(form: NgForm) {

    this.httpService.postData(form)
      .subscribe({
        next: (data: any) => { this.toastr.success("Congratulations! You are registered!"); },
        error: (error: any) => {
          console.log(error);
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
