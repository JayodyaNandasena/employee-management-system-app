import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestOtComponent } from './request-ot.component';

describe('RequestOtComponent', () => {
  let component: RequestOtComponent;
  let fixture: ComponentFixture<RequestOtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestOtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestOtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
