import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowpaperdetailComponent } from './showpaperdetail.component';

describe('ShowpaperdetailComponent', () => {
  let component: ShowpaperdetailComponent;
  let fixture: ComponentFixture<ShowpaperdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowpaperdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowpaperdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
