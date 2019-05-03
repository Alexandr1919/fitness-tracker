import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';

import { Training } from '../../training.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.sass']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'status'];
  dataSource = new MatTableDataSource<Training>();
  private arrayChangedSubscription: Subscription;
  isLoading = true;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private trainingService: TrainingService,
  ) { }

  ngOnInit() {
    this.arrayChangedSubscription = this.trainingService.finishedTrainingsArrayChanged
      .subscribe((trainings: Training[]) => {
        this.isLoading = false;
        this.dataSource.data = trainings;
      });
    this.trainingService.fetchFinishedExercises();
  }

  ngOnDestroy() {
    if (this.arrayChangedSubscription) this.arrayChangedSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
