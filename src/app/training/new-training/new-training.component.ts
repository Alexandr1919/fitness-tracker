import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { TrainingService } from '../training.service';

import { Training } from '../../training.model';
import { UiService } from '../../shared/ui.service';
import * as fromRoot from '../../app.reducer';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.sass']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  trainingTypes: Training[];
  trainingSubscription: Subscription;
  isLoading$: Observable<boolean>;
  constructor(
    private trainingService: TrainingService,
    private uiService: UiService,
    private store: Store<fromRoot.State>
  ) {
  }

  ngOnInit() {
    console.log(this.store.select(fromRoot.getIsLoading))
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    // get array of available training in the component
    this.trainingSubscription = this.trainingService.trainingsArrayChanged.subscribe(
      trainingTypes => {
        this.trainingTypes = trainingTypes;
      }
    );

    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableTrainings();
  }

  ngOnDestroy() {
    if (this.trainingSubscription) this.trainingSubscription.unsubscribe();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startTraining(form.value.training);
  }

}
