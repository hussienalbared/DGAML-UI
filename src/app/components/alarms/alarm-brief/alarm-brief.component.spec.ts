import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmBriefComponent } from './alarm-brief.component';

describe('AlarmBriefComponent', () => {
  let component: AlarmBriefComponent;
  let fixture: ComponentFixture<AlarmBriefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmBriefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmBriefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
