import { TestBed, inject } from '@angular/core/testing';

import { TabsServiceService } from './tabs-service.service';

describe('TabsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TabsServiceService]
    });
  });

  it('should be created', inject([TabsServiceService], (service: TabsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
