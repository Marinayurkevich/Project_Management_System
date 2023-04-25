import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { NgForm } from '@angular/forms';
import { createBoard } from '../assets/classes';
import { Board } from '../assets/classes';
import { User } from '../../src/assets/classes';
import { Column } from '../../src/assets/classes';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';



@Injectable()
export class HttpService {
  constructor(private http: HttpClient,
    private toastr: ToastrService
  ) { }

  private data = new Subject<any>();

  URL: string = 'https://final-task-backend-production-c527.up.railway.app/';
  substring: string = "";


  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    })
  };

  errorMessage: String = "";


  postData(form: NgForm) {
    this.substring = "auth/signup";
    const body = { name: form.value.name, login: form.value.login, password: form.value.password };
    return this.http.post(this.URL + this.substring, body);
  }

  postLogin(form: NgForm) {
    this.substring = "auth/signin";
    const body = { login: form.value.login, password: form.value.password };
    return this.http.post(this.URL + this.substring, body);
  }


  postBoard(board: createBoard) {
    this.substring = "boards";
    const body = { title: board.title, owner: board.owner, users: board.users };
    return this.http.post(this.URL + this.substring, body, this.httpOptions);
  }

  getUsers(): Observable<User[]> {
    this.substring = "users";
    return this.http.get(this.URL + this.substring, this.httpOptions)
      .pipe(map((data: any) => {
        let usersList = data["userList"];
        return usersList.map(function (user: any): User {
          return new User(user._id, user.name, user.login);
        });
      }),
        catchError(error => {
          if (error.status === 403) {
            this.toastr.error("Invalid token");
          };
          this.errorMessage = error.message;
          return [];
        })
      );
  }


  deleteUser(_id: string) {
   return this.http.delete(`https://final-task-backend-production-c527.up.railway.app/users/` + _id, this.httpOptions);
  }


  deleteBoard(_id: string) {
    return this.http.delete(`https://final-task-backend-production-c527.up.railway.app/boards/${_id}`, this.httpOptions);
  }

  createColumn(column: Column){
    const body = { title: column.title, order: column.order };
    const id = column._id;
    this.substring = `boards/${id}/columns`;
    return this.http.post(this.URL + this.substring, body, this.httpOptions);
}

  getUserById(_id: string) {
    return this.http.get(`https://final-task-backend-production-c527.up.railway.app/users/` + _id, this.httpOptions);
  }

  getAllBoards(): Observable<Board[]> {
    this.substring = "boards";
    return this.http.get<any>(this.URL + this.substring, this.httpOptions);
  }
  setData(data: any) {
    this.data.next(data);
  }

  getData() {
    return this.data.asObservable();
  }

}

