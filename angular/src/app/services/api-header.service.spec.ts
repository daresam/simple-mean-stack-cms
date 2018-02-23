import { TestBed, inject } from '@angular/core/testing';

import { ApiHeaderService } from './api-header.service';

describe('ApiHeaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiHeaderService]
    });
  });

  it('should be created', inject([ApiHeaderService], (service: ApiHeaderService) => {
    expect(service).toBeTruthy();
  }));
});
