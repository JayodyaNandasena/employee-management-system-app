import {Component, OnInit} from '@angular/core';
import {UserRole} from "../../models/userRole";
import {AuthService} from "../../services/auth.service";
import {RouterLink} from "@angular/router";
import {NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgClass,
    NgIf
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})

export class SidebarComponent implements OnInit {
  sidebarItems = {
    manager: [
      {label: 'My Profile', icon: 'bi-person', link: '/profile'},
      {label: 'View Salary Slip', icon: 'bi-currency-dollar', link: '/salary'},
      {label: 'Request Leaves', icon: 'bi-briefcase', link: '/requestLeaves'},
      {label: 'Messages', icon: 'bi-chat-dots', link: '/messages'},
      {separator: true},
      {label: 'Manage Employee Details', icon: 'bi-person', link: '/manageEmployee'},
      {label: 'Manage Attendance', icon: 'bi-book', link: '/manageAttendance'},
      {label: 'Manage Leave Requests', icon: 'bi-briefcase', link: '/manageLeaves'},
      {label: 'Manage OT Requests', icon: 'bi-briefcase', link: '/manageOT'}
    ],
    user: [
      {label: 'My Profile', icon: 'bi-person', link: '/profile'},
      {label: 'View Salary Slip', icon: 'bi-file-text', link: '/salary'},
      {label: 'View Attendance', icon: 'bi-book', link: '/manageAttendance'},
      {label: 'Request Leaves', icon: 'bi-briefcase', link: '/requestLeaves'},
      {label: 'Request OT', icon: 'bi-briefcase', link: '/requestOT'},
      {label: 'Messages', icon: 'bi-chat-dots', link: '/messages'}
    ]
  };

  role: UserRole | null = null;
  selectedSidebarItems: any[] = [];
  dashboardLink: string | null = null;

  constructor(private readonly authService: AuthService) {
  }

  ngOnInit() {
    this.role = this.authService.getRole();

    if (this.role === UserRole.USER) {
      this.selectedSidebarItems = this.sidebarItems.user;
      this.dashboardLink = '/dashboardNonManager';
      return;
    }

    this.selectedSidebarItems = this.sidebarItems.manager;
    this.dashboardLink = '/dashboardManager';
  }
}
