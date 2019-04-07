import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../../auth/auth.service';
import { TrainingService } from '../../training/training.service';
import { Training } from '../../training.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth: boolean;
  isTraining: Training;
  authSubscription: Subscription;
  isTrainingSubscription: Subscription;

  constructor(private authService: AuthService, private trainingService: TrainingService) {
  }

  ngOnInit() {
    // subscribe to authChange trigger
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      // and bind it to private boolean variable
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
    // don't forget to unsubscribe
    this.authSubscription.unsubscribe();
  }


}
