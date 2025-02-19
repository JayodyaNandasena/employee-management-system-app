import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SessionStorageService } from '../../services/session-storage.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../../models/models';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent{
  public loginForm = new FormGroup({
    username : new FormControl("",Validators.required),
    password : new FormControl("",Validators.required)
  })

  constructor(
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private toastr: ToastrService) {}

  
  login(){
    fetch("http://localhost:8081/login",{
      method:'POST',
      body: JSON.stringify(this.loginForm.value),
      headers : {"Content-type": "application/json"}
    })
    .then(res => res.json())
    .then(data=> {
      if(data.status == true){
        this.sessionStorageService.setEmployeeId(data.employeeDetails.employee.employeeId);
        this.sessionStorageService.setEmployeeName(
          data.employeeDetails.employee.firstName + " " + data.employeeDetails.employee.lastName);
        this.sessionStorageService.setIsManager(data.employeeDetails.isManager);
        console.log(this.sessionStorageService.getEmployeeId());

        if (data.employeeDetails.isManager) {
          this.router.navigateByUrl('/dashboardManager');
        } else {
          this.router.navigate(['/dashboardNonManager']);
        }

      }else{
        this.toastr.error(data.message, 'Login Failed',{
          timeOut: 3000,
        });
      }
    })
  }
}
