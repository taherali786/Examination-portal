import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowqdetailComponent } from './showqdetail.component';

describe('ShowqdetailComponent', () => {
  let component: ShowqdetailComponent;
  let fixture: ComponentFixture<ShowqdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowqdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowqdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
