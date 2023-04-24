import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../http.service';
import { Board } from '../../../assets/classes';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})

export class DeleteConfirmComponent {


  constructor(
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient,
    private httpService: HttpService,
    private route: ActivatedRoute) {
      this._id = this.route.snapshot.paramMap.get('_id');
    }

  _id?: string | null;
  board: Board = new Board("", "", "", []);

  hideDeleteConfirm = true;

  doNotDelete() {
    this.hideDeleteConfirm = false;
  }



  deleteBoard() {
    console.log("Удалить board");
}

}
