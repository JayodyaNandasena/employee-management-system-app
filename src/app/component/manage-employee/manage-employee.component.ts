import {Component, OnInit} from '@angular/core';
import {SessionStorageService} from '../../services/session-storage.service';
import {CommonModule} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {Branch, EmployeeRead, JobRole} from "../../models";
import {BranchService, JobRoleService} from "../../services";

@Component({
  selector: 'app-manage-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './manage-employee.component.html',
  styleUrl: './manage-employee.component.css'
})
export class ManageEmployeeComponent implements OnInit {
  public isManager: boolean = false;
  public jobTitlesList: string[] = [];
  public branchList: string[] = [];

  public employee: EmployeeRead = {
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
      isManager: false
    }
  };

  public newBranch: Branch = {
    name: "",
    latitude: 0.0,
    longitude: 0.0,
    address: ""
  }

  public newJobRole: JobRole = {
    jobRoleId: '',
    title: '',
    leavePolicy: {
      policyId: '',
      noOfPTODays: 0
    },
    salaryPolicy: {
      monthlyBasicSalary: 0,
      overtimeSalaryPerHour: 0,
      epfPercentage: 8,
      etfPercentage: 3
    },
    shiftType: '',
    shiftPolicies: [
      {startTime: '', endTime: '', totalHours: ''},
      {startTime: '', endTime: '', totalHours: ''}
    ]
  }

  constructor(
    private readonly sessionService: SessionStorageService,
    private readonly toastr: ToastrService,
    private readonly branchService: BranchService,
    private readonly jobRoleService: JobRoleService,
    private readonly router: Router) {
  }

  ngOnInit(): void {
    this.isManager = this.sessionService.getIsManager();
    this.loadBranchNames();
    this.loadJobTitles();
  }

  searchEmployee() {
    this.employee.account.password = "";
    fetch("http://localhost:8081/employee/by-id?id=" + this.employee.employeeId, {
      method: 'GET',
      headers: {"Content-type": "application/json"}
    })
      .then(res => {
        if (!res.ok) {
          this.toastr.error('Error', 'Employee Not Found', {
            timeOut: 1000,
          });
        }
        return res.json();
      })
      .then(data => {
        if (!data || !data.employeeId) {
          this.toastr.error('Error', 'Employee Not Found', {
            timeOut: 2000,
          });
        } else {
          this.employee.employeeId = data.employeeId;
          this.employee.firstName = data.firstName;
          this.employee.lastName = data.lastName;
          this.employee.nic = data.nic;
          this.employee.dob = data.dob;
          this.employee.hiredDate = data.hiredDate;
          this.employee.address = data.address;
          this.employee.email = data.email;
          this.employee.gender = data.gender;
          this.employee.branchName = data.branchName;
          this.employee.jobRoleTitle = data.jobRoleTitle;
          this.employee.account.username = data.account.username;
          this.employee.account.isManager = data.account.isManager;
        }
      })
      .catch(error => {
        this.toastr.warning('Error', 'Data Loading Failed', {
          timeOut: 4000,
        });
      });


  }

  updateEmployee() {
    console.log(this.employee);

    fetch("http://localhost:8081/employee", {
      method: 'PUT',
      body: JSON.stringify(this.employee),
      headers: {"Content-type": "application/json"}
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          this.toastr.info('Profile Updated Successfully', 'Success', {
            timeOut: 3000,
          });

        } else {
          this.toastr.error(data.message, 'Data Loading Failed', {
            timeOut: 3000,
          });
        }
      })
  }

  addEmployee() {
    fetch("http://localhost:8081/employee", {
      method: 'POST',
      body: JSON.stringify(this.employee),
      headers: {"Content-type": "application/json"}
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          this.toastr.success('Employee Added Successfully', 'Success', {
            timeOut: 3000,
          });

        } else {
          this.toastr.error(data.message, 'Data Loading Failed', {
            timeOut: 3000,
          });
        }
      })
      .catch(error => {
        this.toastr.error('System error', 'Error');
      });
  }

  clear() {
    this.employee = {
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
        isManager: false
      }
    }
  }

  addNewBranch() {
    this.branchService.persist(this.newBranch).subscribe({
        next: (data) => {
          if (!data) {
            this.toastr.error('Duplicate Branch', 'Error');
            return;
          }
          this.toastr.success('Success', 'Branch Added Successfully!', {
            timeOut: 3000,
          });
          this.loadBranchNames();
        },
        error: () => {
          this.toastr.error("Error", "Error saving new branch", {timeOut: 3000});
        }
      }
    );
  }

  addNewJobRole() {
    this.newJobRole.shiftPolicies = this.newJobRole.shiftPolicies.map(policy => ({
      ...policy,
      startTime: this.formatTime(policy.startTime),
      endTime: this.formatTime(policy.endTime),
      totalHours: this.formatTime(policy.totalHours)
    }));

    this.jobRoleService.persist(this.newJobRole).subscribe({
        next: (data) => {
          if (!data) {
            this.toastr.error('Duplicate Job Role Title', 'Error');
            return;
          }
          this.toastr.success('Success', 'Job Role Added Successfully!', {
            timeOut: 3000,
          });
          this.loadJobTitles();
        },
        error: () => {
          this.toastr.error("Error", "Error saving new job role", {timeOut: 3000});
        }
      }
    );
  }

  onShiftTypeChange(event: any) {
    this.newJobRole.shiftType = event.target.value;
  }

  formatTime(time: string): string {
    if (!time) {
      return '00:00:00'; // Default value for missing time
    }

    const timeParts = time.split(':');

    if (timeParts.length === 1) {
      return `${timeParts[0]}:00:00`;
    } else if (timeParts.length === 2) {
      return `${timeParts[0]}:${timeParts[1]}:00`;
    } else if (timeParts.length === 3) {
      return `${timeParts[0]}:${timeParts[1]}:${timeParts[2]}`;
    } else {
      console.error('Invalid time format:', time);
      return '00:00:00';
    }
  }

  loadBranchNames() {
    this.branchService.getAllNames().subscribe({
      next: (data) => {
        this.branchList = data || [];
      },
      error: () => {
        this.toastr.error("Error", "Error fetching branch names", {timeOut: 3000});
      }
    });
  }

  loadJobTitles() {
    this.jobRoleService.getAllTitles().subscribe({
      next: (data) => {
        this.jobTitlesList = data || [];
      },
      error: () => {
        this.toastr.error("Error", "Error fetching job titles", {timeOut: 3000});
      }
    });
  }
}
