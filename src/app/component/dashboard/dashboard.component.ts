import {Component, OnInit} from '@angular/core';
import {MarkAttendanceComponent} from "../mark-attendance/mark-attendance.component";
import {NgClass, NgForOf} from "@angular/common";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {WelcomeComponent} from "../welcome/welcome.component";
import {UserRoles} from "../../models";
import {AuthService} from "../../services";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MarkAttendanceComponent,
    NgForOf,
    SidebarComponent,
    WelcomeComponent,
    RouterLink,
    NgClass
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  dashboardItems = {
    manager: [
      {label: 'My Profile', description: 'Manage your account settings', link: '/profile', styleClass: 'illustration2'},
      {label: 'View Salary Slip', description: 'Access your salary slip', link: '/salary', styleClass: 'illustration3'},
      {label: 'View Attendance', description: 'Check your attendance', link: '/requestOT', styleClass: 'illustration2'},
      {
        label: 'Request Leaves',
        description: 'Submit leave requests',
        link: '/manageAttendance',
        styleClass: 'illustration4'
      },
      {
        label: 'Employee Details',
        description: 'View and Edit employee profiles',
        link: '/manageEmployee',
        styleClass: 'illustration3'
      },
      {
        label: 'Manage Leaves',
        description: 'Manage leave requests',
        link: '/manageLeaves',
        styleClass: 'illustration3'
      },
      {label: 'OT Requests', description: 'Manage overtime requests', link: '/manageOT', styleClass: 'illustration3'},
      {
        label: 'Messages',
        description: 'Receive messages on submitted Requests',
        link: '/messages',
        styleClass: 'illustration3'
      },
    ],
    user: [
      {label: 'My Profile', description: 'Manage your account settings', link: '/profile', styleClass: 'illustration2'},
      {label: 'View Salary Slip', description: 'Access your salary slip', link: '/salary', styleClass: 'illustration3'},
      {
        label: 'Request Leaves',
        description: 'Submit leave requests',
        link: '/manageAttendance',
        styleClass: 'illustration4'
      },
      {
        label: 'Request OT',
        description: 'Submit overtime requests',
        link: '/requestLeaves',
        styleClass: 'illustration5'
      },
      {label: 'View Attendance', description: 'Check your attendance', link: '/requestOT', styleClass: 'illustration2'},
      {
        label: 'Messages',
        description: 'Receive messages on submitted Requests',
        link: '/messages',
        styleClass: 'illustration3'
      },
    ]
  };

  role: UserRoles | null = null;
  selectedDashboardItems: any[] = [];

  constructor(private readonly authService: AuthService) {
  }

  ngOnInit() {
    this.role = this.authService.getRole();

    if (this.role === UserRoles.USER) {
      this.selectedDashboardItems = this.dashboardItems.user;
      return;
    }

    this.selectedDashboardItems = this.dashboardItems.manager;
  }
}
