import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../assets/classes';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../http.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient,
    private httpService: HttpService) { }


  user: User = new User("", "", "");

  async goToRegistration() {
    await this.router.navigate(['/register'])
  }


  submit(form: NgForm) {


    this.httpService.postLogin(form)
      .subscribe({
        next: (data: any) => { console.log(data.token); this.toastr.success("Successeful login"); },
        error: (error: any) => {
          //console.log(error);
          if (error.status === 401 || error.status === 400) {
            console.log(error.statusCode);

          this.toastr.error(`Error ${error.status}. Authorization error. Try again, please!`);
          }
        },

      });
  }
}
