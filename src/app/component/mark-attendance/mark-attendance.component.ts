import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {AttendanceService, AuthService} from "../../services";
import {CreateAttendance} from "../../models";

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
          console.log(`latitude: ${position.coords.latitude}, longitude: ${position.coords.longitude}`);
          this.attendanceRequest.latitude = this.location.latitude;
          this.attendanceRequest.longitude = this.location.longitude;
          resolve();
        },
        (error) => {
          let errorMsg = 'Unable to fetch location.';
          if (error.code === error.PERMISSION_DENIED) {
            errorMsg = 'Location access denied. Please enable location services.';
          } else if (error.code === error.TIMEOUT) {
            errorMsg = 'Location request timed out. Please try again in an open area.';
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            errorMsg = 'Location information is unavailable. Try again later.';
          }

          this.toastr.error(errorMsg, 'Error');
          reject(new Error(errorMsg)); // Stop execution
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    });
  }

  private submitAttendance(action: 'clockIn' | 'clockOut'): void {
    this.getCurrentLocation()
      .then(() => {
        this.attendanceService[action](this.attendanceRequest).subscribe({
          next: (data) => {
            if (data) {
              data.status
                ? this.toastr.success(data.message, 'Success')
                : this.toastr.warning(data.message, 'Failed');
            }
          },
          error: (err) => {
            let errorMessage = 'A system error occurred. Please try again later.';

            if (err.status === 403) {
              errorMessage = 'Location mismatch: You must clock in within 1 km of your branch.';
            } else if (err.status === 404) {
              errorMessage = 'Employee record not found. Please contact HR.';
            } else if (err.status === 409) {
              errorMessage = 'You have already clocked in for today.';
            } else if (err.error?.message) {
              errorMessage = err.error.message;
            }

            this.toastr.error(errorMessage, 'Error');
          }
        });
      })
      .catch((err) => {
        this.toastr.error('Location access denied. Please enable GPS.', 'Error');
        // Prevent API call if geolocation fails
      });
  }

  clockIn(): void {
    this.submitAttendance('clockIn');
  }

  clockOut(): void {
    this.submitAttendance('clockOut');
  }
}
