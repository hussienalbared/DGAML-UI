import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCloseReasonComponent } from './select-close-reason.component';

describe('SelectCloseReasonComponent', () => {
  let component: SelectCloseReasonComponent;
  let fixture: ComponentFixture<SelectCloseReasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCloseReasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCloseReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
