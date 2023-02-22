import { Injectable } from '@angular/core';
import {
  Observable,
  BehaviorSubject,
  of,
  throwError,
  lastValueFrom,
} from 'rxjs';
import { Contact } from '../models/contact.model';
import { User } from '../models/user.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private storageService: StorageService) {}

  private DB_KEY = 'UserDB';
  private _loggedInUser$ = new BehaviorSubject<User | null>(null);
  public loggedInUser$ = this._loggedInUser$.asObservable();

  public getLoggedInUser(): User {
    let loggedInUser = this._load();
    this._save(loggedInUser);
    return loggedInUser;
  }

  signup(name: string): void {
    const newUser: User = {
      _id: this.makeId(),
      name,
      balance: 200,
      transactions: [],
    };
    this._save(newUser);
  }

  addMove(contact: Contact, amountToTransact: number) {
    let loggedInUser = this._load();
    loggedInUser.balance -= amountToTransact;
    loggedInUser.transactions.push({
      toId: contact._id || undefined,
      to: contact.name,
      amount: amountToTransact,
      at: Date.now(),
    });
    this._save(loggedInUser);
  }

  private _load(): User {
    return this.storageService.loadFromStorage(this.DB_KEY);
  }

  private _save(user: User) {
    this.storageService.saveToStorage(this.DB_KEY, user);
    this._loggedInUser$.next({ ...user });
  }

  public checkLoggedIn() {
    let loggedInUser: User | undefined = this.storageService.loadFromStorage(
      this.DB_KEY
    );
    if (!loggedInUser) return false;
    return true;
  }

  private makeId(length = 5) {
    var text = '';
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }
}
