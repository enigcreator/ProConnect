import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashesComponent } from './flashes.component';

describe('FlashesComponent', () => {
  let component: FlashesComponent;
  let fixture: ComponentFixture<FlashesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
