import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../http.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public router: Router,
    private toastr: ToastrService,
    private http: HttpClient,
    private httpService: HttpService) { }



  async goToWelcomePage() {
    await this.router.navigate([""])
  }



  showProfile = false;
  newBoardCreation = false;
  showDeleteConfirm = false;


  createBoardItem() {
    this.newBoardCreation = true;
  }

}
