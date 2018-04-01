import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlaramSearchComponent } from './alaram-search.component';

describe('AlaramSearchComponent', () => {
  let component: AlaramSearchComponent;
  let fixture: ComponentFixture<AlaramSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlaramSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlaramSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
