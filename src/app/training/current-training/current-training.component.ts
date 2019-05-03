import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { TrainingService } from '../training.service';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.sass']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: number;
  TRAINING_COMPLETE_SCALE = 100;
  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit() {
    this.startTimer();
  }

  startTimer() {
    // count duration percentage of the specific training
    const step = this.trainingService.getCurrentTraining().duration / this.TRAINING_COMPLETE_SCALE * 1000;
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= this.TRAINING_COMPLETE_SCALE) {
        this.trainingService.completeTraining();
        clearInterval(this.timer);
      }
    }, step);
  }

  onStop() {
    clearInterval(this.timer);
    // open angular material dialog window and pass data to it
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      result ? this.trainingService.cancelTraining(this.progress) : this.startTimer();
    });
  }

}
