import { Component, OnInit } from '@angular/core';
import { SidebarAdminComponent } from '../sidebar-admin/sidebar-admin.component';
import { SessionStorageService } from '../../services/session-storage.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-leaves',
  standalone: true,
  imports: [FormsModule, CommonModule, SidebarAdminComponent],
  templateUrl: './manage-leaves.component.html',
  styleUrl: './manage-leaves.component.css'
})
export class ManageLeavesComponent implements OnInit{
  public pendingList = null;
  public approvedList = null;
  public rejectedList = null;

  constructor(
    private sessionService: SessionStorageService,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private router: Router){}

  ngOnInit(): void {
    this.loadPendingRequests();
    this.loadApprovedRequests();
    this.loadRejectedRequests();
  }

  loadPendingRequests(){
    fetch("http://localhost:8081/timeOff/byStatus?status=PENDING&requestorId="+this.sessionService.getEmployeeId())
      .then(res => res.json())
      .then(data => {
        data.forEach((element: { startDateTime: string | number | Date | null; endDateTime: string | number | Date | null; }) => {
          element.startDateTime = this.datePipe.transform(element.startDateTime, 'yyyy-MM-dd HH:mm:ss');
          element.endDateTime = this.datePipe.transform(element.endDateTime, 'yyyy-MM-dd HH:mm:ss');
        });
        this.pendingList = data;
      });
  }

  loadApprovedRequests(){
    fetch("http://localhost:8081/timeOff/byStatus?status=APPROVED&requestorId="+this.sessionService.getEmployeeId())
      .then(res => res.json())
      .then(data => {
        data.forEach((element: { startDateTime: string | number | Date | null; endDateTime: string | number | Date | null; }) => {
          element.startDateTime = this.datePipe.transform(element.startDateTime, 'yyyy-MM-dd HH:mm:ss');
          element.endDateTime = this.datePipe.transform(element.endDateTime, 'yyyy-MM-dd HH:mm:ss');

        });
        this.approvedList = data;
      });
  }

  loadRejectedRequests(){
    fetch("http://localhost:8081/timeOff/byStatus?status=REJECTED&requestorId="+this.sessionService.getEmployeeId())
      .then(res => res.json())
      .then(data => {
        data.forEach((element: { startDateTime: string | number | Date | null; endDateTime: string | number | Date | null; }) => {
          element.startDateTime = this.datePipe.transform(element.startDateTime, 'yyyy-MM-dd HH:mm:ss');
          element.endDateTime = this.datePipe.transform(element.endDateTime, 'yyyy-MM-dd HH:mm:ss');
        });
        this.rejectedList = data;
      });
  }

  aproveRequest(requestId : string){
    const request = {
      "managerId": this.sessionService.getEmployeeId(),
      "requestId": requestId,
      "status": "APPROVED",
      "approvedDateTime": new Date().toISOString()
    };

    fetch("http://localhost:8081/timeOff", {
      method: 'PUT',
      body: JSON.stringify(request),
      headers: { "Content-type": "application/json" }
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          if(data.status === true){
            this.toastr.success(data.message, 'Success', {
              timeOut: 3000,
            });
            this.loadApprovedRequests();
            this.loadRejectedRequests();
            this.loadPendingRequests();
          }
        } else {
          this.toastr.error(data.message, 'Failed', {
            timeOut: 3000,
          });
        }
      })
      .catch(error => {
        this.toastr.warning('System error', 'Error');
      });


  }

  rejectRequest(requestId : string){
    console.log(requestId);

    const request = {
      "managerId": this.sessionService.getEmployeeId(),
      "requestId": requestId,
      "status": "REJECTED",
      "approvedDateTime": new Date().toISOString()
    };

    fetch("http://localhost:8081/timeOff", {
      method: 'PUT',
      body: JSON.stringify(request),
      headers: { "Content-type": "application/json" }
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          if(data.status === true){
            this.toastr.success(data.message, 'Success', {
              timeOut: 3000,
            });
            this.loadApprovedRequests();
            this.loadRejectedRequests();
            this.loadPendingRequests();
          }
        } else {
          this.toastr.error(data.message, 'Failed', {
            timeOut: 3000,
          });
        }
      })
      .catch(error => {
        this.toastr.warning('System error', 'Error');
      });


  }

}
