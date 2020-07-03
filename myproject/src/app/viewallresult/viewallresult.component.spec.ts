import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewallresultComponent } from './viewallresult.component';

describe('ViewallresultComponent', () => {
  let component: ViewallresultComponent;
  let fixture: ComponentFixture<ViewallresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewallresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewallresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
