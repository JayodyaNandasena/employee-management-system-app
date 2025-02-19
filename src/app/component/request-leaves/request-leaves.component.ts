import { Component, OnInit } from '@angular/core';
import { SidebarNonmanagerComponent } from '../sidebar-nonmanager/sidebar-nonmanager.component';
import { SidebarAdminComponent } from '../sidebar-admin/sidebar-admin.component';
import { SessionStorageService } from '../../services/session-storage.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Branch, EmployeeRead, LeaveRequest } from '../../models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-leaves',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarNonmanagerComponent,SidebarAdminComponent],
  templateUrl: './request-leaves.component.html',
  styleUrl: './request-leaves.component.css'
})
export class RequestLeavesComponent implements OnInit{
  public isManager: boolean = false;
  
  leaveForm = new FormGroup({
    employeeId : new FormControl(this.sessionService.getEmployeeId()),
    text : new FormControl("", Validators.required),
    requestDateTime : new FormControl(new Date().toISOString()),
    startDate : new FormControl("", Validators.required),
    startTime : new FormControl("", Validators.required),
    endDate : new FormControl("", Validators.required),
    endTime : new FormControl("", Validators.required)
  })

  constructor(
    private sessionService:SessionStorageService,
    private router: Router,
    private toastr: ToastrService){}

  ngOnInit(): void {
    this.isManager = this.sessionService.getIsManager();

    // if(this.sessionService.getEmployeeId() != null){
    //   this.leaveForm.controls['employeeId'] = this.sessionService.getEmployeeId();
    // }
    
  }

  submitRequest(){

    fetch("http://localhost:8081/timeOff",{
      method:'POST',
      body: JSON.stringify(this.leaveForm.value),
      headers : {"Content-type": "application/json"}
    })
    .then(res => res.json())
    .then(data=> {
      if(data.status === true){
        this.toastr.success('Request Sent Successfully', 'Success',{
          timeOut: 3000,
        });

      }else{
        this.toastr.error(data.message, 'Error',{
          timeOut: 3000,
        });
      }
    })
  }

  discardRequest(){
    this.leaveForm.reset();
  }

  // getEndDateTime(): string {
  //   if (this.endDate && this.endTime) {
  //     const dateTime = new Date(`${this.endDate}T${this.endTime}`);
  //     return dateTime.toISOString(); // Returns ISO 8601 format
  //   }
  //   return "";
  // }

  // getStartDateTime(): string {
  //   if (this.startDate && this.startTime) {
  //     const dateTime = new Date(`${this.startDate}T${this.startTime}`);
  //     return dateTime.toISOString(); // Returns ISO 8601 format
  //   }
  //   return "";
  // }
}
