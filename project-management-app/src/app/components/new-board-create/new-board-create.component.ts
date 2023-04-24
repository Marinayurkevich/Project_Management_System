import { Component } from '@angular/core';
import { Board } from '../../../assets/classes';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../http.service';


@Component({
  selector: 'app-new-board-create',
  templateUrl: './new-board-create.component.html',
  styleUrls: ['./new-board-create.component.css']
})
export class NewBoardCreateComponent {

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient,
    private httpService: HttpService
  ) { }

  board: Board = new Board("", "", "", []);

  hideBoardCreation = true;


  cancel() {
    this.hideBoardCreation = false;
  }

  submit(form: NgForm) {
    this.board.title = form.value.title;
    this.board.owner = form.value.owner;
    this.board.users = form.value.users;
    console.log(this.board);
    this.httpService.postBoard(this.board)
      .subscribe(success => {
        this.toastr.success("Board is created");
      });
    this.httpService.postBoard(this.board)
      .subscribe(success => {
        this.httpService.setData({ boardCreated: true });
        this.toastr.success("Board is created");
      });
    this.httpService.setData({ boardCreated: true });
  }

}
