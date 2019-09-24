import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  fieldEmpty: boolean;

  constructor(private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
    // this.loginForm = new FormGroup({
    //   email: new FormControl('', {
    //     validators: [Validators.required, Validators.email]
    //   }),
    //   password: new FormControl('', {
    //     validators: [Validators.required]
    //   })
    // });
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  isControlInvalid(): boolean {

    const control = this.loginForm.controls[controlName];
    return control.invalid && control.touched;
  }

  onSubmit(f) {

    //if(loginForm)
    /*this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });*/
  }

}
