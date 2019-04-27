import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { User } from '../user.model';
import { AuthData } from '../auth-data.model';

@Injectable()
export class AuthService {
  // create a object instance from rxjs, that allows to emit events and subscribe to it in other parts of app
  authChange = new Subject<boolean>();
  private user: User;

  constructor(private router: Router) {

  }

  // method should be called when user signs up
  registerUser(authData: AuthData) {
    // email we get from the form stored in the user object
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000). toString()
    };
    this.authSuccessfully();
  }

  // method should be called when user login
  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000). toString()
    };
    this.authSuccessfully();
  }

  // method should be called when user logout
  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  // get access to the user
  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }

  private authSuccessfully() {
    // pass the value of true to use it in other components
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
