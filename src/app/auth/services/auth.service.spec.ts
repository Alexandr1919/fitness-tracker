import { TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [AuthService],
    imports: [RouterTestingModule]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  it('should return true from isAuth when there is a user', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service.isAuth()).toBeFalsy();
  });
});
