import { TestBed, inject } from '@angular/core/testing';

import { HelpingService } from './helping.service';

describe('HelpingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HelpingService]
    });
  });

  it('should be created', inject([HelpingService], (service: HelpingService) => {
    expect(service).toBeTruthy();
  }));
});
