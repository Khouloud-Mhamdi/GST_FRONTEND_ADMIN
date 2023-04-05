import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeMembresComponent } from './liste-membres.component';

describe('ListeMembresComponent', () => {
  let component: ListeMembresComponent;
  let fixture: ComponentFixture<ListeMembresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeMembresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeMembresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
