import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {AttendanceService} from "../../services/attendance.service";
import {AuthService} from "../../services/auth.service";
import {CreateAttendance} from "../../models/attendance.model";

@Component({
  selector: 'app-mark-attendance',
  standalone: true,
  templateUrl: './mark-attendance.component.html',
  styleUrl: './mark-attendance.component.css'
})
export class MarkAttendanceComponent implements OnInit {
  date: string = '';
  time: string = '';
  currentDateTime: string = '';
  location: { latitude: number; longitude: number } | null = null;

  attendanceRequest: CreateAttendance;

  constructor(
    private readonly toastr: ToastrService,
    private readonly authService: AuthService,
    private readonly attendanceService: AttendanceService
  ) {
    this.attendanceRequest = {
      employeeId: this.authService.getEmployeeId(),
      date: '',
      time: '',
      latitude: 0.0,
      longitude: 0.0
    };
  }

  ngOnInit() {
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000);
  }

  private updateDateTime(): void {
    const now = new Date();
    this.date = now.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    this.time = now.toLocaleTimeString('en-CA', {hour12: false});
    this.currentDateTime = `Date: ${this.date} Time: ${this.time}`;

    // Ensure the attendance request has updated date/time
    this.attendanceRequest.date = this.date;
    this.attendanceRequest.time = this.time;
  }

  private getCurrentLocation(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        this.toastr.error('Geolocation is not supported by your browser', 'Error');
        return reject(new Error('Geolocation not supported'));
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          this.attendanceRequest.latitude = this.location.latitude;
          this.attendanceRequest.longitude = this.location.longitude;
          resolve();
        },
        (error) => {
          this.toastr.error('Unable to fetch location.', 'Error');
          this.attendanceRequest.latitude = 0.0;
          this.attendanceRequest.longitude = 0.0;
          reject(new Error('Unable to fetch location.'));
        },
        {enableHighAccuracy: true, timeout: 5000, maximumAge: 0}
      );
    });
  }

  private submitAttendance(action: 'clockIn' | 'clockOut'): void {
    this.getCurrentLocation()
      .then(() => {
        const request =
          this.attendanceService[action](this.attendanceRequest);

        request.subscribe({
          next: (data) => {
            if (data) {
              data.status
                ? this.toastr.success(data.message, 'Success')
                : this.toastr.warning(data.message, 'Failed');
            }
          },
          error: () => this.toastr.error('A system error occurred', 'Error')
        });
      });
  }

  clockIn(): void {
    this.submitAttendance('clockIn');
  }

  clockOut(): void {
    this.submitAttendance('clockOut');
  }
}
