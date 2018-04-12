import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspectDetailsComponent } from './suspect-details.component';

describe('SuspectDetailsComponent', () => {
  let component: SuspectDetailsComponent;
  let fixture: ComponentFixture<SuspectDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuspectDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
