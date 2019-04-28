import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { TrainingService } from '../training.service';
import { Training } from '../../training.model';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.sass']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  trainingTypes: Training[];
  trainingSubscription: Subscription;
  constructor(private trainingService: TrainingService) {
  }

  ngOnInit() {
    // get array of available training in the component
    this.trainingSubscription = this.trainingService.trainingsArrayChanged.subscribe(
      trainingTypes => this.trainingTypes = trainingTypes
    );
    this.trainingService.fetchAvailableTrainings();
  }

  ngOnDestroy() {
    this.trainingSubscription.unsubscribe();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startTraining(form.value.training);
  }

}
