import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowpaperComponent } from './showpaper.component';

describe('ShowpaperComponent', () => {
  let component: ShowpaperComponent;
  let fixture: ComponentFixture<ShowpaperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowpaperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowpaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
