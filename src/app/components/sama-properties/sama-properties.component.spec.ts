import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamaPropertiesComponent } from './sama-properties.component';

describe('SamaPropertiesComponent', () => {
  let component: SamaPropertiesComponent;
  let fixture: ComponentFixture<SamaPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamaPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamaPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
