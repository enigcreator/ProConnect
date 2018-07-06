import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeepHomeComponent } from './deep-home.component';

describe('DeepHomeComponent', () => {
  let component: DeepHomeComponent;
  let fixture: ComponentFixture<DeepHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeepHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeepHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
