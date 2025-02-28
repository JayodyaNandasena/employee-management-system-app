import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {FormsModule} from '@angular/forms';
import {CommonModule, DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {AuthService, TimeOffService} from "../../services";
import {StatusEnum, TimeOffApproval, TimeOffRequestRead} from "../../models";

@Component({
  selector: 'app-manage-leaves',
  standalone: true,
  imports: [FormsModule, CommonModule, SidebarComponent],
  templateUrl: './manage-leaves.component.html',
  styleUrl: './manage-leaves.component.css'
})
export class ManageLeavesComponent implements OnInit {
  protected readonly StatusEnum = StatusEnum;
  protected pendingList: TimeOffRequestRead[] | null = [];
  protected approvedList: TimeOffRequestRead[] | null = [];
  protected rejectedList: TimeOffRequestRead[] | null = [];
  private userId: string | null = null;

  constructor(
    private readonly authService: AuthService,
    private readonly timeOffService: TimeOffService,
    private readonly toastr: ToastrService,
    private readonly datePipe: DatePipe,
    private readonly router: Router) {
  }

  ngOnInit(): void {
    this.userId = this.authService.getEmployeeId();

    this.loadPendingRequests();
    this.loadApprovedRequests();
    this.loadRejectedRequests();
  }

  loadPendingRequests() {
    this.timeOffService.getByStatus('PENDING', this.userId).subscribe({
      next: (data) => {
        if (data) {
          data.forEach((element) => {
            element.startDateTime = this.datePipe.transform(element.startDateTime, 'yyyy-MM-dd HH:mm:ss');
            element.endDateTime = this.datePipe.transform(element.endDateTime, 'yyyy-MM-dd HH:mm:ss');
          });
          this.pendingList = data;
        }
      },
      error: (error) => {
        console.error('Error loading pending requests:', error);
      }
    });
  }

  loadApprovedRequests() {
    this.timeOffService.getByStatus('APPROVED', this.userId).subscribe({
      next: (data) => {
        if (data) {
          data.forEach((element) => {
            element.startDateTime = this.datePipe.transform(element.startDateTime, 'yyyy-MM-dd HH:mm:ss');
            element.endDateTime = this.datePipe.transform(element.endDateTime, 'yyyy-MM-dd HH:mm:ss');
          });
          this.approvedList = data;
        }
      },
      error: (error) => {
        console.error('Error loading pending requests:', error);
      }
    });
  }

  loadRejectedRequests() {
    this.timeOffService.getByStatus('REJECTED', this.userId).subscribe({
      next: (data) => {
        if (data) {
          data.forEach((element) => {
            element.startDateTime = this.datePipe.transform(element.startDateTime, 'yyyy-MM-dd HH:mm:ss');
            element.endDateTime = this.datePipe.transform(element.endDateTime, 'yyyy-MM-dd HH:mm:ss');
          });
          this.rejectedList = data;
        }
      },
      error: (error) => {
        console.error('Error loading pending requests:', error);
      }
    });
  }

  manageRequest(requestId: string | null, status: StatusEnum) {
    if (!requestId) {
      this.toastr.error('Invalid Request ID', 'Error');
      return;
    }

    const request: TimeOffApproval = {
      "managerId": this.userId,
      "requestId": requestId,
      "status": status,
      "approvedDateTime": new Date().toISOString()
    };

    this.timeOffService.updateStatus(request).subscribe({
      next: (data) => {
        if (data?.status) {
          this.toastr.success(data.message, 'Success', {
            timeOut: 3000,
          });
          this.loadApprovedRequests();
          this.loadRejectedRequests();
          this.loadPendingRequests();
          return;
        }
        this.toastr.error(data.message, 'Failed', {
          timeOut: 3000,
        });
      },
      error: (error) => {
        this.toastr.error('System error', 'Error');
      }
    });
  }
}
