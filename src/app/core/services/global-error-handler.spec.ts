import { TestBed } from '@angular/core/testing';

import { HlobalErrorHandler } from './global-error-handler';

describe('HlobalErrorHandler', () => {
  let service: HlobalErrorHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HlobalErrorHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
