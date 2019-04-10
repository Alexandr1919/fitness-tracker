import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../material.module';
import { PastTrainingComponent } from './past-training.component';
import { TrainingService } from '../training.service';

describe('PastTrainingComponent', () => {
  let component: PastTrainingComponent;
  let fixture: ComponentFixture<PastTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PastTrainingComponent],
      imports: [FormsModule, MaterialModule, BrowserAnimationsModule],
      providers: [TrainingService]
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
