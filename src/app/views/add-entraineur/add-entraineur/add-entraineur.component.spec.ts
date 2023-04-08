import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntraineurComponent } from './add-entraineur.component';

describe('AddEntraineurComponent', () => {
  let component: AddEntraineurComponent;
  let fixture: ComponentFixture<AddEntraineurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEntraineurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEntraineurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
