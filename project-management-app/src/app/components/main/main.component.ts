import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Board } from '../../../assets/classes';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../http.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})


export class MainComponent {


  constructor(
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient,
    private httpService: HttpService) { }


  board: Board = new Board("", "", "", []);

  createBoard() {
  }

  addBoard() {
  }

  async goToBoard() {
    await this.router.navigate(['/board'])
  }

}
