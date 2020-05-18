import { Injectable } from '@angular/core';
import { Address, Item, Shoppinglist, User } from "./shoppinglist";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ShoppinglistStoreService {

  private api = 'http://bookstore20markl.s1710456023.student.kwmhgb.at/api';

  constructor(private http: HttpClient) { }


  getAllByUserId(userId: number): Observable<Array<Shoppinglist>> {
      return this.http.get(`${this.api}/${userId}/lists`)
          .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getAllVolunteerId(volunteerId: number): Observable<Array<Shoppinglist>> {
      return this.http.get(`${this.api}/getAllVolunteer/${volunteerId}`)
          .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getSingle(id: number): Observable<Shoppinglist> {
      let list = this.http.get<Shoppinglist>(`${this.api}/lists/${id}`)
          .pipe(retry(3)).pipe(catchError(this.errorHandler));

      return list;
  }


  create(shoppinglist: Shoppinglist): Observable<any> {
      return this.http.post(`${this.api}/addList`, shoppinglist)
          .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  update(shoppinglist: Shoppinglist): Observable<any> {
      return this.http.put(`${this.api}/updateList/${shoppinglist.id}`, shoppinglist)
          .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  remove(id: number): Observable<any> {
      return this.http.delete(`${this.api}/deleteList/${id}`)
          .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }



  register(user: User): Observable<any> {
      return this.http.post(`${this.api}/auth/register`, user)
          .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getSingleUser(userId: number): Observable<User> {
      let user = this.http.get<User>(`${this.api}/getUser/${userId}`)
          .pipe(retry(3)).pipe(catchError(this.errorHandler));

      return user;
  }



  private errorHandler(error: Error | any): Observable<any> {
      return throwError(error);
  }
}
