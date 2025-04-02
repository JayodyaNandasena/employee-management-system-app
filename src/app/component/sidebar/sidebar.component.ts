import {Component, OnInit} from '@angular/core';
import {UserRoles} from "../../models";
import {AuthService} from "../../services";
import {RouterLink, Router} from "@angular/router";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {ToastrService} from "ngx-toastr";

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

  role: UserRoles | null = null;
  selectedSidebarItems: any[] = [];

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.role = this.authService.getRole();

    if (this.role === UserRoles.USER) {
      this.selectedSidebarItems = this.sidebarItems.user;
      return;
    }

    this.selectedSidebarItems = this.sidebarItems.manager;
  }

  logout() {
    this.authService.clearToken();
    this.toastr.success('You have logged out. See you again soon!', 'Logged Out', {timeOut: 5000});
    this.router.navigate(['']);
  }

}
