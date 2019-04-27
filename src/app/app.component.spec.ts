import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { HeaderComponent } from './navigation/header/header.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './auth/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TrainingService } from './training/training.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SidenavListComponent,
        HeaderComponent,
      ],
      providers: [
        AuthService,
        TrainingService
      ],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
