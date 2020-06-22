import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewqueComponent } from './addnewque.component';

describe('AddnewqueComponent', () => {
  let component: AddnewqueComponent;
  let fixture: ComponentFixture<AddnewqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnewqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
