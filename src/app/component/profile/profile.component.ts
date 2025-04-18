import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {EmployeeCreate, EmployeeRead, EmployeeUpdate, UserRoles} from "../../models";
import {AuthService, EmployeeService} from "../../services";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, SidebarComponent, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  public isManager: boolean = false;
  public isInvalidFirstName: boolean = false;
  public isInvalidLastName: boolean = false;
  public isInvalidEmail: boolean = false;
  public isInvalidAddress: boolean = false;

  public employeeProfile: EmployeeRead = {
    employeeId: "",
    firstName: "",
    lastName: "",
    nic: "",
    dob: new Date(),
    profilePicture: "",
    hiredDate: new Date(),
    address: "",
    email: "",
    gender: "",
    branchName: "",
    jobRoleTitle: "",
    account: {
      username: "",
      password: "",
      isManager: this.isManager
    }
  };

  public employeeUpdate: EmployeeUpdate = {
    address: "",
    email: "",
    employeeId: "",
    firstName: "",
    lastName: "",
    profilePicture: ""
  }

  constructor(
    private readonly authService: AuthService,
    private readonly employeeService: EmployeeService,
    private readonly toastr: ToastrService,
    private readonly router: Router) {
  }

  ngOnInit(): void {
    this.isManager = this.authService.hasRole([
      UserRoles.DEPARTMENT_MANAGER,
      UserRoles.BRANCH_MANAGER,
      UserRoles.SUPER_ADMIN
    ]);
    this.getById();
  }

  loadProfile(data: EmployeeCreate): void {
    Object.assign(this.employeeProfile, data);
  }

  getById() {
    this.employeeService.getById(this.authService.getEmployeeId()).subscribe({
      next: (data) => {
        if (data) {
          this.loadProfile(data);
        } else {
          this.toastr.error('No data found for this employee.', 'Data Loading Failed', {
            timeOut: 3000,
          });
        }
      },
      error: (err) => {
        this.toastr.error('An error occurred while loading data.', 'Data Loading Failed', {
          timeOut: 3000,
        });
        console.error('Error loading profile:', err);
      }
    });
  }

  updateProfile() {
    if (this.employeeProfile.employeeId == null) {
      this.toastr.error(`Couldn't load your employee ID. Please refresh the page and try again!`, 'Error', {
        timeOut: 3000,
      });
      return;
    }

    if (this.employeeProfile.employeeId !== this.authService.getEmployeeId()) {
      this.toastr.error(`Invalid Employee ID`, 'Error', {
        timeOut: 3000,
      });
      return;
    }

    this.validateData();

    if (this.isInvalidFirstName || this.isInvalidLastName || this.isInvalidEmail || this.isInvalidAddress) {
      return;
    }

    this.employeeUpdate = {
      ...this.employeeProfile,
      employeeId: this.employeeProfile.employeeId || '',
    };

    this.employeeService.updateProfile(this.employeeUpdate).subscribe({
      next: (data) => {
        if (data) {
          this.toastr.success('Profile Updated Successfully', 'Success', {
            timeOut: 3000,
          });
          this.loadProfile(data);
        } else {
          this.toastr.error('Profile Update Failed.', 'Error', {
            timeOut: 3000,
          });
        }
      },
      error: (err) => {
        const message = err?.error?.message || 'An error occurred while updating profile.';

        this.toastr.error(message, 'Error', {
          timeOut: 3000,
        });

        console.error('Error updating profile:', err);
      }
    });
  }

  get formattedGender(): string {
    const gender = this.employeeProfile.gender;
    return gender ? gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase() : '';
  }

  validateData(): void {
    this.isInvalidFirstName = (this.employeeProfile.firstName == null || this.employeeProfile.firstName == "");
    this.isInvalidLastName = (this.employeeProfile.lastName == null || this.employeeProfile.lastName == "");
    this.isInvalidAddress = (this.employeeProfile.address == null || this.employeeProfile.address == "");
    this.isInvalidEmail = (this.employeeProfile.email == null || this.employeeProfile.email == "" || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.employeeProfile.email));
  }

}
