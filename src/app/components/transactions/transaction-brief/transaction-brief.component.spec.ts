import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionBriefComponent } from './transaction-brief.component';

describe('TransactionBriefComponent', () => {
  let component: TransactionBriefComponent;
  let fixture: ComponentFixture<TransactionBriefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionBriefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionBriefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
