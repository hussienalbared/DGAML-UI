import { TestBed, inject } from '@angular/core/testing';

import { ActiveLinkssService } from './active-linkss.service';

describe('ActiveLinkssService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActiveLinkssService]
    });
  });

  it('should be created', inject([ActiveLinkssService], (service: ActiveLinkssService) => {
    expect(service).toBeTruthy();
  }));
});
