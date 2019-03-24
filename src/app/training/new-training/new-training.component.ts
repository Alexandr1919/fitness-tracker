import {Component, OnInit} from '@angular/core';
import {TrainingService} from '../training.service';
import {Exercise} from '../../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.sass']
})
export class NewTrainingComponent implements OnInit {
  trainingTypes: Exercise[];
  constructor(private trainingService: TrainingService) {
  }

  ngOnInit() {
    this.trainingTypes = this.trainingService.getAvailableTrainings();
  }

  onStartTraining() {
    this.trainingService.startTraining()
  }

}
