import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import { User } from './user.model';
import { AuthData } from './auth-data.model';

import { TrainingService } from '../training/training.service';
import { UiService } from '../shared/ui.service';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';

@Injectable()
export class AuthService {
  // create a object instance from rxjs, that allows to emit events and subscribe to it in other parts of app
  authChange = new Subject<boolean>();
  private isAuthenticated = false;
  private user: User;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private snackBar: MatSnackBar,
    private uiService: UiService,
    private store: Store<fromRoot.State>
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        // pass the value of true to use it in other components
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
          this.trainingService.cancelSubscriptions();
          this.authChange.next(false);
          this.router.navigate(['/login']);
          this.isAuthenticated = false;
      }
    });
  }

  // method should be called when user signs up
  registerUser(authData: AuthData) {
    // dispatching action
    this.store.dispatch(new UI.StartLoading());
    // email we get from the form stored in the user object
    this.afAuth.auth.createUserWithEmailAndPassword(
      authData.email.toString().trim(),
      authData.password
    ).then(() => {
      // dispatching action
      this.store.dispatch(new UI.StopLoading());
    })
      .catch(error => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  // method should be called when user login
  login(authData: AuthData) {
    //this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(() => {
      //this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading());
    })
      .catch(error => {
        //this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar(error.message, null, 3000);
      });

    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000). toString()
    };
  }

  // method should be called when user logout
  logout() {
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }

}
