import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowqbankdetailComponent } from './showqbankdetail.component';

describe('ShowqbankdetailComponent', () => {
  let component: ShowqbankdetailComponent;
  let fixture: ComponentFixture<ShowqbankdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowqbankdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowqbankdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
