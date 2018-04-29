import { TestBed, inject } from '@angular/core/testing';

import { SuspectsService } from './suspects.service';

describe('SuspectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuspectsService]
    });
  });

  it('should be created', inject([SuspectsService], (service: SuspectsService) => {
    expect(service).toBeTruthy();
  }));
});
