import { TestBed } from '@angular/core/testing';

import { ModerateurGuardGuard } from './moderateur-guard.guard';

describe('ModerateurGuardGuard', () => {
  let guard: ModerateurGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ModerateurGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
