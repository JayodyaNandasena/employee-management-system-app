import { Component, OnInit } from '@angular/core';
import { SidebarNonmanagerComponent } from '../sidebar-nonmanager/sidebar-nonmanager.component';
import { SidebarAdminComponent } from '../sidebar-admin/sidebar-admin.component';
import { SessionStorageService } from '../../services/session-storage.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { EmployeeRead } from '../../models/models';
import { Router } from '@angular/router';
import { jsDocComment } from '@angular/compiler';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarNonmanagerComponent,SidebarAdminComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  public isManager: boolean = false;

  public employeeProfile:EmployeeRead = {
    employeeId : this.sessionService.getEmployeeId(),
    firstName : "",
    lastName : "",
    nic : "",
    dob : new Date(),
    profilePicture : "",
    hiredDate : new Date(),
    address : "",
    email : "",
    gender : "",
    branchName : "",
    jobRoleTitle : "",
    account: {
      username: "",
      password: "",
      isManager: this.sessionService.getIsManager()
  }
  };

  constructor(
    private sessionService:SessionStorageService,
    private toastr: ToastrService,
    private router: Router){}

  ngOnInit(): void {
    this.isManager = this.sessionService.getIsManager();
    this.loadProfile();
  }

  loadProfile(){
    fetch("http://localhost:8081/employee/by-id?id="+this.employeeProfile.employeeId,{
      method:'GET',
      headers : {"Content-type": "application/json"}
    })
    .then(res => res.json())
    .then(data=> {
      if(data){
        this.employeeProfile.employeeId=data.employeeId;
        this.employeeProfile.firstName=data.firstName;
        this.employeeProfile.lastName=data.lastName;
        this.employeeProfile.nic=data.nic;
        this.employeeProfile.dob=data.dob;
        this.employeeProfile.hiredDate=data.hiredDate;
        this.employeeProfile.address=data.address;
        this.employeeProfile.email=data.email;
        this.employeeProfile.gender=data.gender;
        this.employeeProfile.branchName=data.branchName;
        this.employeeProfile.jobRoleTitle=data.jobRoleTitle;
        this.employeeProfile.account.username=data.account.username;
      }else{
        this.toastr.error(data.message, 'Data Loading Failed',{
          timeOut: 3000,
        });
      }
    })
  }

  updateProfile(){
    console.log(this.employeeProfile);

    this.sessionService.setEmployeeName(
      this.employeeProfile.firstName + " " + this.employeeProfile.lastName);

    fetch("http://localhost:8081/employee",{
      method:'PUT',
      body: JSON.stringify(this.employeeProfile),
      headers : {"Content-type": "application/json"}
    })
    .then(res => res.json())
    .then(data=> {
      if(data){
        this.loadProfile();
        this.toastr.info('Profile Updated Successfully', 'Success',{
          timeOut: 3000,
        });

      }else{
        this.toastr.error(data.message, 'Data Loading Failed',{
          timeOut: 3000,
        });
      }
    })
  }

}
