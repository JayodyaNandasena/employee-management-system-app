import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {AttendanceService, AuthService} from "../../services";
import {UserRoles, ReadAttendance} from "../../models";

@Component({
  selector: 'app-manage-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './manage-attendance.component.html',
  styleUrl: './manage-attendance.component.css'
})
export class ManageAttendanceComponent implements OnInit {
  public isManager: boolean = false;
  public records: ReadAttendance[] = [];
  public empId: string = "";

  constructor(
    private readonly attendanceService: AttendanceService,
    private readonly authService: AuthService,
    private readonly toastr: ToastrService,
    private readonly router: Router) {
  }

  ngOnInit(): void {
    this.isManager = this.authService.hasRole([
      UserRoles.DEPARTMENT_MANAGER,
      UserRoles.BRANCH_MANAGER,
      UserRoles.SUPER_ADMIN
    ]);
    this.loadUserRecords();
  }

  loadUserRecords() {
    this.attendanceService
      .allByEmployeeID(this.authService.getEmployeeId())
      .subscribe({
        next: (data) => {
          if (data) {
            this.records = data;
          }
        },
        error: () => {
          this.toastr.error("Error", "Data Loading Failed", {timeOut: 3000});
        }
      });
  }

  loadEmployeeRecords() {
    this.attendanceService
      .allByEmployeeID(this.empId)
      .subscribe({
        next: (data) => {
          if (data) {
            this.records = data;
          }
        },
        error: () => {
          this.toastr.error("Error", "Data Loading Failed", {timeOut: 3000});
        }
      });
  }

}
