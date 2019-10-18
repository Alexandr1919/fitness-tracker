import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from '../../auth/auth.service';
import { TrainingService } from '../../training/training.service';
import { Training } from '../../training.model';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth$: Observable<boolean>;
  isTraining: Training;
  private isTrainingSubscription: Subscription;

  constructor(private store: Store<fromRoot.State>, private authService: AuthService, private trainingService: TrainingService) {
  }

  ngOnInit() {
    // subscribe to authChange trigger
    this.isAuth$ = this.store.select(fromRoot.getIsAuthenticated);

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

}
