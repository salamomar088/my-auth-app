import { TestBed } from '@angular/core/testing';

import { ServiceAlert } from './alert';

describe('ServiceAlert', () => {
  let service: ServiceAlert;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceAlert);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
