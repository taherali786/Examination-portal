import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JointestdetailComponent } from './jointestdetail.component';

describe('JointestdetailComponent', () => {
  let component: JointestdetailComponent;
  let fixture: ComponentFixture<JointestdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JointestdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JointestdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
