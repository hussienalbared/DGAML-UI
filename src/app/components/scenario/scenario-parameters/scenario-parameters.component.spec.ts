import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioParametersComponent } from './scenario-parameters.component';

describe('ScenarioParametersComponent', () => {
  let component: ScenarioParametersComponent;
  let fixture: ComponentFixture<ScenarioParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScenarioParametersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenarioParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
