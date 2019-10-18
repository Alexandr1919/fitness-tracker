import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';

import { User } from './user.model';
import { AuthData } from './auth-data.model';

import { TrainingService } from '../training/training.service';
import { UiService } from '../shared/ui.service';
import * as fromRoot from '../app.reducer';
import * as UI from '../reducers/ui-reducer/ui.actions';
import * as Auth from '../reducers/auth-reducer/auth.actions';

@Injectable()
export class AuthService {
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
        console.log(user)
        this.store.dispatch(new Auth.SetAuthenticated());
        this.router.navigate(['/training']);
      } else {
          this.trainingService.cancelSubscriptions();
          this.store.dispatch(new Auth.SetUnauthenticated());
          this.router.navigate(['/login']);
      }
    });
  }

  // method should be called when user signs up
  registerUser(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    // email we get from the form stored in the user object
    this.afAuth.auth.createUserWithEmailAndPassword(
      authData.email.toString().trim(),
      authData.password
    ).then(() => {
      this.store.dispatch(new UI.StopLoading());
    })
      .catch(error => {
        this.uiService.showSnackbar(error.message, null, 3000);
        this.store.dispatch(new UI.StopLoading());
      });
  }

  // method should be called when user login
  login(authData: AuthData) {
    console.log(authData)
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(() => {
      this.store.dispatch(new UI.StopLoading());
    })
      .catch(error => {
        this.uiService.showSnackbar(error.message, null, 3000);
        this.store.dispatch(new UI.StopLoading());
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

}
