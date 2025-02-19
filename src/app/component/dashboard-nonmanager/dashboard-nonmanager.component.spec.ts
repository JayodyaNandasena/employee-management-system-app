import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNonmanagerComponent } from './dashboard-nonmanager.component';

describe('DashboardNonmanagerComponent', () => {
  let component: DashboardNonmanagerComponent;
  let fixture: ComponentFixture<DashboardNonmanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardNonmanagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardNonmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
