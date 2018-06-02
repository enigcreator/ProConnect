import { TestBed, inject } from '@angular/core/testing';

import { ValidateServiceService } from './validate-service.service';

describe('ValidateServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidateServiceService]
    });
  });

  it('should be created', inject([ValidateServiceService], (service: ValidateServiceService) => {
    expect(service).toBeTruthy();
  }));
});
