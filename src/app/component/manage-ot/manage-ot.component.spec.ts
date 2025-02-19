import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOtComponent } from './manage-ot.component';

describe('ManageOtComponent', () => {
  let component: ManageOtComponent;
  let fixture: ComponentFixture<ManageOtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageOtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageOtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
