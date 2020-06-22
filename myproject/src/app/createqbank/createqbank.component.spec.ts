import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateqbankComponent } from './createqbank.component';

describe('CreateqbankComponent', () => {
  let component: CreateqbankComponent;
  let fixture: ComponentFixture<CreateqbankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateqbankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateqbankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
