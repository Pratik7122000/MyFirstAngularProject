import { TestBed } from '@angular/core/testing';

import { EmployeedetailService } from './employeedetail.service';

describe('EmployeedetailService', () => {
  let service: EmployeedetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeedetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
