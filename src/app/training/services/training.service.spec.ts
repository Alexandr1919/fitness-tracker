import {inject, TestBed} from '@angular/core/testing';

import { TrainingService } from './training.service';
import {TrainingComponent} from '../training.component';

describe('Service: Auth', () => {
  let service: TrainingService;
  let component: TrainingComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrainingService]
    });
  });

  beforeEach(() => {
    service = new TrainingService();
    component = new TrainingComponent(service);
  });

  afterEach(() => {
    service = null;
  });

  it('should return sum', inject([TrainingService], (serv: TrainingService) => {
    expect(serv.sum(3, 8)).toBe(11);
  }));

});
