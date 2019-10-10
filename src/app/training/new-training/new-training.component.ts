import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { TrainingService } from '../training.service';

import { Training } from '../../training.model';
import { UiService } from '../../shared/ui.service';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.sass']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  trainingTypes: Training[];
  trainingSubscription: Subscription;
  uiServiceSubscription: Subscription;
  isLoading = false;
  constructor(
    private trainingService: TrainingService,
    private uiService: UiService
  ) {
  }

  ngOnInit() {
    // get array of available training in the component
    this.trainingSubscription = this.trainingService.trainingsArrayChanged.subscribe(
      trainingTypes => {
        this.trainingTypes = trainingTypes;
      }
    );
    this.uiServiceSubscription = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableTrainings();
  }

  ngOnDestroy() {
    if (this.trainingSubscription) this.trainingSubscription.unsubscribe();
    if (this.uiServiceSubscription) this.uiServiceSubscription.unsubscribe();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startTraining(form.value.training);
  }

}
