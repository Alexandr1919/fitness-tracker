import { Training } from '../training.model';
import { Subject } from 'rxjs';

export class TrainingService {
  private availableTrainings: Training[] = [
    { id: 'crunches', name: 'Crunches', duration: /*30*/5, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: /*180*/5, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: /*120*/5, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: /*60*/5, calories: 8 }
  ];
  // in order to use it in header component and hide nav bar
  trainingChanged = new Subject<Training>();

  // should store the training user selected
  private currentTraining: Training;
  private trainings: Training[] = [];

  // in order to use copy of the array
  getAvailableTrainings() {
    // get the copy of initial array to prevent its mutation
    return this.availableTrainings.slice();
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
