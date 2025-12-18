import { TestBed } from '@angular/core/testing';

import { NurseData } from './nursedata';

describe('NurseData', () => {
  let service: NurseData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NurseData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
