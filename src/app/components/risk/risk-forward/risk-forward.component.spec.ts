import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskForwardComponent } from './risk-forward.component';

describe('RiskForwardComponent', () => {
  let component: RiskForwardComponent;
  let fixture: ComponentFixture<RiskForwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskForwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskForwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
