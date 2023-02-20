import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { Contact } from '../models/contact.model';
import { User } from '../models/user.model';

const LOGGED_IN_USER: User = {
  _id: 'u101',
  name: 'Srulik Johanson',
  phone: '+942-84-845-522',
  email: 'srulikon@srul.ik',
  balance: 200,
  transactions: [],
};
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _userDB: User = LOGGED_IN_USER;

  private _loggedInUser$ = new BehaviorSubject<User | null>(null);
  public loggedInUser$ = this._loggedInUser$.asObservable();

  constructor() {}

  public getLoggedInUser(): void {
    let loggedInUser = this._userDB;
    this._loggedInUser$.next(loggedInUser);
  }
}
