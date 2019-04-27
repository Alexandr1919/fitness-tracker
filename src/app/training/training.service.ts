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
  trainingsArrayChanged = new Subject<Training[]>();
  finishedTrainingsArrayChanged = new Subject<Training[]>();

  // should store the training user selected
  private currentTraining: Training;

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
        this.trainingsArrayChanged.next([...this.availableTrainings]);
      });
  }

  // called on click start button
  startTraining(selectedId: string) {
    // this is how you can update traingings
    // this.db.doc('availableTrainings' + selectedId).update({
    //   lastSelected: new Date()
    // });
    // find the exercise user selected
    this.currentTraining = this.availableTrainings.find(tr => tr.id === selectedId);
    this.trainingChanged.next({
      ...this.currentTraining
    });
  }

  completeTraining() {
    // save completed trainings in the training list
    this.addDataToDatabase({
      ...this.currentTraining,
      date: new Date(),
      status: 'completed'
    });
    this.currentTraining = null;
    // trigger says that there are no more current trainings
    this.trainingChanged.next(null);
  }

  cancelTraining(progress: number) {
    this.addDataToDatabase({
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

  fetchFinishedExercises() {
    this.db.collection('finishedTrainings')
      .valueChanges()
      .subscribe((trainings: Training[]) => {
        console.log(trainings)
        this.finishedTrainingsArrayChanged.next(trainings);
      });
    //return this.trainings.slice();
  }

  private addDataToDatabase(training: Training) {
    this.db
      .collection('finishedTrainings')
      .add(training);
  }
}
