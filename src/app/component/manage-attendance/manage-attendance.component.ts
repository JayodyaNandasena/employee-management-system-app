import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../../services/session-storage.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { EmployeeRead } from '../../models/models';
import { Router } from '@angular/router';
import {SidebarComponent} from "../sidebar/sidebar.component";

@Component({
  selector: 'app-manage-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './manage-attendance.component.html',
  styleUrl: './manage-attendance.component.css'
})
export class ManageAttendanceComponent implements OnInit{
  public isManager: boolean = false;
  public records = null;
  public empId:string = "";

  constructor(
    private sessionService:SessionStorageService,
    private toastr: ToastrService,
    private router: Router){}

  ngOnInit(): void {
    this.isManager = this.sessionService.getIsManager();
    this.loadUserRecords();
  }

  loadUserRecords(){
    fetch("http://localhost:8081/attendance?employeeId="+this.sessionService.getEmployeeId(),{
      method:'GET',
      headers : {"Content-type": "application/json"}
    })
    .then(res => res.json())
    .then(data=> {
      if(data){
        this.records = data;
      }else{
        this.toastr.error(data.message, 'Data Loading Failed',{
          timeOut: 3000,
        });
      }
    })
  }

  loadEmployeeRecords(){
    fetch("http://localhost:8081/attendance?employeeId="+this.empId,{
      method:'GET',
      headers : {"Content-type": "application/json"}
    })
    .then(res => res.json())
    .then(data=> {
      if(data){
        this.records = data;
      }else{
        this.toastr.error(data.message, 'Data Loading Failed',{
          timeOut: 3000,
        });
      }
    })
  }

}
