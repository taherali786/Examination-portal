import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard2headerComponent } from './dashboard2header.component';

describe('Dashboard2headerComponent', () => {
  let component: Dashboard2headerComponent;
  let fixture: ComponentFixture<Dashboard2headerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dashboard2headerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dashboard2headerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
