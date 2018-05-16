import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountAlarmInBriefComponent } from './account-alarm-in-brief.component';

describe('AccountAlarmInBriefComponent', () => {
  let component: AccountAlarmInBriefComponent;
  let fixture: ComponentFixture<AccountAlarmInBriefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountAlarmInBriefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountAlarmInBriefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
