import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {MatDialog} from '@angular/material';

import { StopTrainingComponent } from './stop-training.component';
import {TrainingService} from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.sass']
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingExit = new EventEmitter<void>()
  progress = 0;
  timer: number;
  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit() {
    this.startTimer();
  }
  startTimer() {
    const step = this.trainingService.getCurrentTraining().duration / 100 * 1000;
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, step);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      result ? this.trainingService.trainingChanged.next(result) : this.startTimer();
    });
  }

}
