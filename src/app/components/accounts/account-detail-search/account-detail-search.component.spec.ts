import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailSearchComponent } from './account-detail-search.component';

describe('AccountDetailSearchComponent', () => {
  let component: AccountDetailSearchComponent;
  let fixture: ComponentFixture<AccountDetailSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountDetailSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
