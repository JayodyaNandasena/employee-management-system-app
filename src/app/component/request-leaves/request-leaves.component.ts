import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {AuthService, TimeOffService} from "../../services";
import {TimeOffRequest, UserRoles} from "../../models";

@Component({
  selector: 'app-request-leaves',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent],
  templateUrl: './request-leaves.component.html',
  styleUrl: './request-leaves.component.css'
})
export class RequestLeavesComponent implements OnInit {
  public isManager: boolean = false;

  public leaveForm = new FormGroup({
    text: new FormControl("", Validators.required),
    startDate: new FormControl("", Validators.required),
    startTime: new FormControl("", Validators.required),
    endDate: new FormControl("", Validators.required),
    endTime: new FormControl("", Validators.required)
  })
  protected minDate: string | undefined;

  constructor(
    private readonly authService: AuthService,
    private readonly timeOffService: TimeOffService,
    private readonly router: Router,
    private readonly toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.isManager = this.authService.hasRole([
      UserRoles.DEPARTMENT_MANAGER,
      UserRoles.BRANCH_MANAGER,
      UserRoles.SUPER_ADMIN
    ]);

    const today = new Date();
    this.minDate = today.toISOString().split('T')[0]; // "yyyy-MM-dd"
  }

  submitRequest() {
    if (this.leaveForm.invalid) {
      this.toastr.error("Please fill in all required fields", "Validation Error");
      return;
    }

    const formValue = this.leaveForm.value;
    const now = new Date();

    const startDateTime = new Date(`${formValue.startDate}T${formValue.startTime}`);
    const endDateTime = new Date(`${formValue.endDate}T${formValue.endTime}`);
    const requestDateTime = now; // current timestamp

    if (startDateTime < now) {
      this.toastr.error("Start date and time cannot be in the past", "Validation Error");
      return;
    }

    if (endDateTime < now) {
      this.toastr.error("End date and time cannot be in the past", "Validation Error");
      return;
    }

    if (endDateTime < startDateTime) {
      this.toastr.error("End date-time cannot be before start date-time", "Validation Error");
      return;
    }

    const requestPayload: TimeOffRequest = {
      employeeId: this.authService.getEmployeeId(),
      text: formValue.text,
      requestDateTime: this.toLocalISOString(requestDateTime),
      startDateTime: this.toLocalISOString(startDateTime),
      endDateTime: this.toLocalISOString(endDateTime)
    };

    this.timeOffService.persist(requestPayload)
      .subscribe({
        next: (data) => {
          if (data?.status === true) {
            this.toastr.success('Request Sent Successfully', 'Success', {timeOut: 3000});
            this.leaveForm.reset();
          } else {
            this.toastr.error(data?.message, 'Error', {timeOut: 3000});
          }
        },
        error: (error) => {
          this.toastr.error("Error", "Request Failed. Please try again later.", {timeOut: 3000});
        }
      });
  }

  discardRequest() {
    this.leaveForm.reset();
  }

  toLocalISOString(date: Date): string {
    const tzOffset = date.getTimezoneOffset() * 60000; // in milliseconds
    return new Date(date.getTime() - tzOffset).toISOString().slice(0, -1);
  }
}
