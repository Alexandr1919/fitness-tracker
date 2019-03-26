import {Exercise} from '../exercise.model';
import {Subject} from 'rxjs';

export class TrainingService {
  private availableTrainings: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];
  // in order to use it in header component and hide nav bar
  trainingChanged = new Subject<Exercise>();

  // should store the exercise user selected
  private runningTraining: Exercise;

  // in order to use copy of the array
  getAvailableTrainings() {
    return this.availableTrainings.slice();
  }

  // called on click start button
  startTraining(selectedId: string) {
    // find the exercise user selected
    this.runningTraining = this.availableTrainings.find(tr => tr.id === selectedId);
    this.trainingChanged.next({
      ...this.runningTraining
    });
  }

  getCurrentTraining() {
    return {...this.runningTraining};
  }
}
