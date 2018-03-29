import { TestBed, inject } from '@angular/core/testing';

import { SearchAccountService } from './search-account.service';

describe('SearchAccountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchAccountService]
    });
  });

  it('should be created', inject([SearchAccountService], (service: SearchAccountService) => {
    expect(service).toBeTruthy();
  }));
});
