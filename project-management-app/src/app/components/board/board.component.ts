import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Column } from '../../../assets/classes';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../http.service';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {

  _id: string | null;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient,
    private httpService: HttpService) {
    this._id = this.route.snapshot.paramMap.get('_id');
  }

  column: Column = new Column("", "", 0, "", "");

  columns = [
    { title: "" }
  ]

  createColumn(columnName: any) {
    this.column.order = this.column.order;
    this.column._id = this._id!;
    this.column.title = columnName;

    this.httpService.createColumn(this.column)
      .subscribe(success => {
        this.toastr.success("Column is created");
      });
  }



}
