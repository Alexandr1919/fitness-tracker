import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';

import { Training } from '../training.model';

@Injectable()
export class TrainingService {
  private availableTrainings: Training[] = [];
  // in order to use it in header component and hide nav bar
  trainingChanged = new Subject<Training>();
  // triggers whenever we got new exercises after exercises finished
  trainingsChanged = new Subject<Training[]>();

  // should store the training user selected
  private currentTraining: Training;
  private trainings: Training[] = [];

  constructor(private db: AngularFirestore) {
  }

  fetchAvailableTrainings() {
    this.db
      .collection('availableTrainings')
      .snapshotChanges()
      .pipe(map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            ...doc.payload.doc.data()
          } as Training;
        });
      }))
      .subscribe((trainings: Training[]) => {
        this.availableTrainings = trainings;
        this.trainingsChanged.next([...this.availableTrainings]);
      });
  }

  // called on click start button
  startTraining(selectedId: string) {
    // find the exercise user selected
    this.currentTraining = this.availableTrainings.find(tr => tr.id === selectedId);
    this.trainingChanged.next({
      ...this.currentTraining
    });
  }

  completeTraining() {
    // save completed trainings in the training list
    this.trainings.push({
      ...this.currentTraining,
      date: new Date(),
      status: 'completed'
    });
    this.currentTraining = null;
    // trigger says that there are no more current trainings
    this.trainingChanged.next(null);
  }

  cancelTraining(progress: number) {
    this.trainings.push({
      ...this.currentTraining,
      duration: this.currentTraining.duration * (progress / 100),
      calories: this.currentTraining.calories * (progress / 100),
      date: new Date(),
      status: 'cancelled'
    });
    this.currentTraining = null;
    // trigger says that there are no more current trainings
    this.trainingChanged.next(null);

  }

  getCurrentTraining() {
    return {...this.currentTraining};
  }

  getFinishedExercises() {
    return this.trainings.slice();
  }
}
