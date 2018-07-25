import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalPartySearchComponent } from './external-party-search.component';

describe('ExternalPartySearchComponent', () => {
  let component: ExternalPartySearchComponent;
  let fixture: ComponentFixture<ExternalPartySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalPartySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalPartySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
