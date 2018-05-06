import { TestBed, inject } from '@angular/core/testing';

import { MockAuthServiceService } from './mock-auth-service.service';

describe('MockAuthServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockAuthServiceService]
    });
  });

  it('should be created', inject([MockAuthServiceService], (service: MockAuthServiceService) => {
    expect(service).toBeTruthy();
  }));
});
