import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickCarComponent } from './pick-car.component';

describe('PickCarComponent', () => {
  let component: PickCarComponent;
  let fixture: ComponentFixture<PickCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickCarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
