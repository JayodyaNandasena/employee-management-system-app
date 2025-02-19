import { Component, OnInit } from '@angular/core';
import { SidebarNonmanagerComponent } from '../sidebar-nonmanager/sidebar-nonmanager.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SessionStorageService } from '../../services/session-storage.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-request-ot',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, SidebarNonmanagerComponent],
  templateUrl: './request-ot.component.html',
  styleUrl: './request-ot.component.css'
})
export class RequestOtComponent {
  public minDate: string = "";

  otForm = new FormGroup({
    employeeId : new FormControl(this.sessionService.getEmployeeId()),
    date : new FormControl("",Validators.required),
    requestDate: new FormControl(new Date().toISOString()),
    startTime: new FormControl("", Validators.required),
    endTime: new FormControl("", Validators.required),
    text: new FormControl(""),
    status: new FormControl("PENDING")
  })

  public request = {
    "employeeId": this.sessionService.getEmployeeId(),
    "date": new Date(),
    "requestDate": new Date().toISOString(),
    "startTime": "",
    "endTime": "",
    "text": "",
    "status": "PENDING"
  }

  ngOnInit(): void {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }



  constructor(
    private sessionService: SessionStorageService,
    private router: Router,
    private toastr: ToastrService) { }

  persistRequest() {

    console.log(this.otForm.value);

    if (this.otForm.status == "INVALID") {
      this.toastr.error('Invalid data', 'Error', {
        timeOut: 3000,
      });
    }

    fetch("http://localhost:8081/overtime", {
      method: 'POST',
      body: JSON.stringify(this.otForm.value),
      headers: { "Content-type": "application/json" }
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === true) {
          this.toastr.success('Request Sent Successfully', 'Success', {
            timeOut: 3000,
          });

        } else {
          this.toastr.error(data.message, 'Error', {
            timeOut: 3000,
          });
        }
      })
  }

  discardRequest() {
    this.otForm.reset();
  }
}
