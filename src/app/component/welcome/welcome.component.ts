import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "../../services/employee.service";
import { AuthService } from "../../services/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {
  employeeId: string | null = null;
  employeeName: string | null = null;

  constructor(
    private readonly employeeService: EmployeeService,
    private readonly authService: AuthService,
    private readonly toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.employeeId = this.authService.getEmployeeId();
    if (this.employeeId) {
      this.getEmployeeName();
    }
  }

  getEmployeeName() {
    this.employeeService.getNameById(this.employeeId).subscribe({
      next: (data) => {
        this.employeeName = data?.name ?? null;
      },
      error: () => {
        this.toastr.error("Error", "Error fetching name", { timeOut: 3000 });
      }
    });
  }
}
