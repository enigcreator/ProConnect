import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupBarComponent } from './signup-bar.component';

describe('SignupBarComponent', () => {
  let component: SignupBarComponent;
  let fixture: ComponentFixture<SignupBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
