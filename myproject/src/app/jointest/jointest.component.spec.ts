import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JointestComponent } from './jointest.component';

describe('JointestComponent', () => {
  let component: JointestComponent;
  let fixture: ComponentFixture<JointestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JointestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JointestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
