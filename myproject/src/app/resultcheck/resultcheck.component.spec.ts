import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultcheckComponent } from './resultcheck.component';

describe('ResultcheckComponent', () => {
  let component: ResultcheckComponent;
  let fixture: ComponentFixture<ResultcheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultcheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultcheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
