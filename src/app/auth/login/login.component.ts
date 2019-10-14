import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../auth.service';
import { UiService } from '../../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading$: Observable<boolean>;

  constructor(private authService: AuthService, private uiService: UiService, private store: Store<{ui: fromApp.State}>) { }

  ngOnInit() {
    // subscribing to store changes
    this.isLoading$ = this.store.pipe(map(res => res.ui && res.ui.isLoading));
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {
        validators: [Validators.required]
      })
    });
  }

  onSubmit(loginForm) {
    this.authService.login({
      email: loginForm.value.email,
      password: loginForm.value.password
    });
  }

}
