import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TrainingService } from '../training.service';
import { Training } from '../../training.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.sass']
})
export class NewTrainingComponent implements OnInit {
  trainingTypes: Training[] = [];
  constructor(private trainingService: TrainingService) {
  }

  ngOnInit() {
    // get array of available training in the component
    this.trainingTypes = this.trainingService.getAvailableTrainings();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startTraining(form.value.training);
  }

}
