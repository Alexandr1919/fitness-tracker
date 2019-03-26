import {Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Subscription} from 'rxjs';
import {TrainingService} from '../../training/training.service';
import {Exercise} from '../../exercise.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth: boolean;
  isTraining: Exercise;
  authSubscription: Subscription;
  isTrainingSubscription: Subscription;

  constructor(private authService: AuthService, private trainingService: TrainingService) {
  }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });

    this.isTrainingSubscription = this.trainingService.trainingChanged.subscribe(trainingStatus => {
      this.isTraining = trainingStatus;
    });
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }


}
