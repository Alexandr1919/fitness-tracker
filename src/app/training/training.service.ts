import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Training } from '../training.model';
import { UiService } from '../shared/ui.service';
import * as UI from '../reducers/ui-reducer/ui.actions';
import * as fromRoot from '../app.reducer';

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
  private fireBaseSubscriptions: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UiService,
    private store: Store<fromRoot.State>
  ) {}

  fetchAvailableTrainings() {
    this.store.dispatch(new UI.StartLoading());
    this.fireBaseSubscriptions.push(this.db
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
        this.store.dispatch(new UI.StopLoading());
        this.availableTrainings = trainings;
        this.trainingsArrayChanged.next([...this.availableTrainings]);
      }, () => {
        this.uiService.showSnackbar(
          'Error occurred, please try again',
          null,
          3000
        );
        this.store.dispatch(new UI.StopLoading());
        this.trainingChanged.next(null);
      })
    );
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
    this.fireBaseSubscriptions.push(this.db.collection('finishedTrainings')
      .valueChanges()
      .subscribe((trainings: Training[]) => {
        this.finishedTrainingsArrayChanged.next(trainings);
      }));
  }

  cancelSubscriptions() {
    this.fireBaseSubscriptions.forEach(
      sub => sub.unsubscribe()
    );
  }

  private addDataToDatabase(training: Training) {
    this.db
      .collection('finishedTrainings')
      .add(training);
  }
}
