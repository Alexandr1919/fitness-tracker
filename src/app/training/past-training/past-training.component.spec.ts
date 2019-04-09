import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastTrainingComponent } from './past-training.component';
import {MatCell, MatFormField, MatHeaderCell, MatTable} from '@angular/material';

describe('PastTrainingComponent', () => {
  let component: PastTrainingComponent;
  let fixture: ComponentFixture<PastTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatHeaderCell, MatFormField, MatTable, MatCell ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
