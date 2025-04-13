import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {AuthService, OverTimeService} from "../../services";
import {StatusEnum} from "../../models";
import {OverTimeRequest} from "../../models/over-time.model";

@Component({
  selector: 'app-request-ot',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, SidebarComponent],
  templateUrl: './request-ot.component.html',
  styleUrl: './request-ot.component.css'
})
export class RequestOtComponent implements OnInit {
  public maxDate: string = "";

  public otForm = new FormGroup({
    date: new FormControl("", Validators.required),
    startTime: new FormControl("", Validators.required),
    endTime: new FormControl("", Validators.required),
    text: new FormControl(""),
  })

  ngOnInit(): void {
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
  }

  constructor(
    private readonly authService: AuthService,
    private readonly otService: OverTimeService,
    private readonly router: Router,
    private readonly toastr: ToastrService) {
  }

  persistRequest() {
    if (this.otForm.invalid) {
      this.toastr.error("Please fill in all required fields", "Validation Error");
      return;
    }

    const formValue = this.otForm.value;
    const now = new Date();

    const start = new Date(`1970-01-01T${formValue.startTime}`);
    const end = new Date(`1970-01-01T${formValue.endTime}`);
    
    if (end < start) {
      this.toastr.error("End time cannot be before start time", "Validation Error");
      return;
    }

    const requestPayload: OverTimeRequest = {
      employeeId: this.authService.getEmployeeId(),
      date: formValue.date,
      requestDate: now,
      startTime: formValue.startTime,
      endTime: formValue.endTime,
      text: formValue.text,
      status: StatusEnum.PENDING
    }

    this.otService.persist(requestPayload)
      .subscribe({
        next: (data) => {
          if (data?.status === true) {
            this.toastr.success('Request Sent Successfully', 'Success', {timeOut: 3000});
            this.otForm.reset();
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
    this.otForm.reset();
  }
}
