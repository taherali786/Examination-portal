import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowqbankComponent } from './showqbank.component';

describe('ShowqbankComponent', () => {
  let component: ShowqbankComponent;
  let fixture: ComponentFixture<ShowqbankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowqbankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowqbankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
