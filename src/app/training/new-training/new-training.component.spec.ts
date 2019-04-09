import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTrainingComponent } from './new-training.component';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardTitle,
  MatFormField, MatFormFieldModule, MatInputModule,
  MatOption,
  MatPseudoCheckbox, MatRippleModule,
  MatSelect, MatSelectTrigger
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

describe('NewTrainingComponent', () => {
  let component: NewTrainingComponent;
  let fixture: ComponentFixture<NewTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatCardTitle, MatOption, MatCard, MatCardContent, MatSelect, MatSelectTrigger, MatCardActions, MatPseudoCheckbox],
      imports: [FormsModule, MatRippleModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
