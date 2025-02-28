import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {AuthService, OverTimeService} from "../../services";
import {StatusEnum} from "../../models";
import {OverTimeApproval, OverTimeRequestRead} from "../../models/over-time.model";

@Component({
  selector: 'app-manage-ot',
  standalone: true,
  imports: [FormsModule, CommonModule, SidebarComponent],
  templateUrl: './manage-ot.component.html',
  styleUrl: './manage-ot.component.css'
})
export class ManageOtComponent implements OnInit {
  private userId: string | null = null;
  protected pendingList: OverTimeRequestRead[] | null = null;
  protected approvedList: OverTimeRequestRead[] | null = null;
  protected rejectedList: OverTimeRequestRead[] | null = null;
  protected readonly StatusEnum = StatusEnum;

  constructor(
    private readonly authService: AuthService,
    private readonly overTimeService: OverTimeService,
    private readonly toastr: ToastrService,
    private readonly router: Router) {
  }

  ngOnInit(): void {
    this.userId = this.authService.getEmployeeId();

    this.loadPendingRequests();
    this.loadApprovedRequests();
    this.loadRejectedRequests();
  }

  loadPendingRequests() {
    if (!this.userId) {
      this.toastr.error('Error retrieving user ID', 'Error', {
        timeOut: 3000,
      });
      return;
    }

    this.overTimeService.loadRequestsByStatus(this.userId, StatusEnum.PENDING).subscribe({
      next: (data) => {
        if (data) {
          this.pendingList = data;
        }
      },
      error: () => {
        this.toastr.error('Error retrieving pending request list', 'Error', {
          timeOut: 3000,
        });
      }
    });
  }

  loadApprovedRequests() {
    if (!this.userId) {
      this.toastr.error('Error retrieving user ID', 'Error', {
        timeOut: 3000,
      });
      return;
    }

    this.overTimeService.loadRequestsByStatus(this.userId, StatusEnum.APPROVED).subscribe({
      next: (data) => {
        if (data) {
          this.approvedList = data;
        }
      },
      error: () => {
        this.toastr.error('Error retrieving approved request list', 'Error', {
          timeOut: 3000,
        });
      }
    });
  }

  loadRejectedRequests() {
    if (!this.userId) {
      this.toastr.error('Error retrieving user ID', 'Error', {
        timeOut: 3000,
      });
      return;
    }

    this.overTimeService.loadRequestsByStatus(this.userId, StatusEnum.REJECTED).subscribe({
      next: (data) => {
        if (data) {
          this.rejectedList = data;
        }
      },
      error: () => {
        this.toastr.error('Error retrieving rejected request list', 'Error', {
          timeOut: 3000,
        });
      }
    });
  }

  manageRequest(requestId: string, status:StatusEnum) {
    if (!this.userId){
      this.toastr.error('Error retrieving user ID', 'Error', {
        timeOut: 3000,
      });
      return;
    }

    const request:OverTimeApproval = {
      "managerId": this.userId,
      "requestId": requestId,
      "status": status,
      "approvedDateTime": new Date().toISOString()
    };

    this.overTimeService.manageRequests(request).subscribe({
      next: (data) => {
        if (data.status) {
          this.toastr.success(data.message, 'Success', {
            timeOut: 3000,
          });
          this.loadApprovedRequests();
          this.loadRejectedRequests();
          this.loadPendingRequests();
        } else {
          this.toastr.error(data.message, 'Failed', {
            timeOut: 3000,
          });
        }
      },
      error: () => {
        this.toastr.error('System error', 'Error');
      }
    });
  }
}
