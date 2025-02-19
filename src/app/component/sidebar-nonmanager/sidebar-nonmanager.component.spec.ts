import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarNonmanagerComponent } from './sidebar-nonmanager.component';

describe('SidebarNonmanagerComponent', () => {
  let component: SidebarNonmanagerComponent;
  let fixture: ComponentFixture<SidebarNonmanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarNonmanagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarNonmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
