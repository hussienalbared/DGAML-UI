import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmDetail1Component } from './alarm-detail-1.component';

describe('AlarmDetail1Component', () => {
  let component: AlarmDetail1Component;
  let fixture: ComponentFixture<AlarmDetail1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmDetail1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmDetail1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
