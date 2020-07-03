import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowallresultComponent } from './showallresult.component';

describe('ShowallresultComponent', () => {
  let component: ShowallresultComponent;
  let fixture: ComponentFixture<ShowallresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowallresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowallresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
