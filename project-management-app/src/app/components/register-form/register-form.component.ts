import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../assets/classes';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})

export class RegisterFormComponent {

  constructor(
    private router: Router,
    private toastr: ToastrService) { }


  user: User = new User("", "", "", "");

  async goToSignIn() {
    await this.router.navigate(['/login'])
  }




  submit(form: NgForm) {
    console.log(form);
    console.log(form.value.name);
    console.log(this.user);
    this.toastr.success("Congratulations! You are registered!");
}
}
