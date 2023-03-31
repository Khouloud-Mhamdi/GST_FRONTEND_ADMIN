import { TestBed } from '@angular/core/testing';

import { GestionnaireGuardGuard } from './gestionnaire-guard.guard';

describe('GestionnaireGuardGuard', () => {
  let guard: GestionnaireGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GestionnaireGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
