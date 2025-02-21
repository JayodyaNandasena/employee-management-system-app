import {Component} from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-mark-attendance',
  standalone: true,
  imports: [],
  templateUrl: './mark-attendance.component.html',
  styleUrl: './mark-attendance.component.css'
})
export class MarkAttendanceComponent {
  constructor(private readonly toastr: ToastrService) {
  }

  employeeName: string | null | undefined;
  date: string = '';
  time: string = '';
  currentDateTime: string = '';
  location: { latitude: number; longitude: number } | null = null;

  public AttendanceRequest = {
    employeeId: sessionStorage.getItem('employeeId'),
    date: this.date,
    time: this.time,
    latitude: 0.0,
    longitude: 0.0
  }

  getCurrentLocation(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        const options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.location = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            };
            console.log(this.location.latitude + "," + this.location.longitude);

            // Assign the values to AttendanceRequest
            this.AttendanceRequest.latitude = this.location.latitude;
            this.AttendanceRequest.longitude = this.location.longitude;

            resolve(); // Resolve the promise
          },
          (error) => {
            console.error('Error getting location', error);
            reject(error); // Reject the promise
          },
          options
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        reject(new Error('Geolocation not supported'));
      }
    });
  }

  clockIn() {
    this.getCurrentLocation()
      .then(() => {
        this.AttendanceRequest.date = this.date;
        this.AttendanceRequest.time = this.time;

        return fetch("http://localhost:8081/attendance/clockIn", {
          method: 'POST',
          body: JSON.stringify(this.AttendanceRequest),
          headers: {"Content-type": "application/json"}
        });
      })
      .then(res => res.json())
      .then(data => {
        if (data.status === true) {
          console.log(data);
          this.toastr.success(data.message, 'Success');
        } else {
          console.log("false: " + data);
          this.toastr.warning(data.message, 'ClockIn Failed');
        }
      })
      .catch(error => {
        this.toastr.error('System error', 'Error');
      });
  }

  clockOut() {
    // this.httpClient.post(
    //   "http://localhost:8081/attendance/clockIn",
    //   this.AttendanceRequest)
    //   .subscribe(data => {
    //     console.log(data);
    //   }).unsubscribe();


    this.getCurrentLocation()
      .then(() => {
        this.AttendanceRequest.date = this.date;
        this.AttendanceRequest.time = this.time;

        return fetch("http://localhost:8081/attendance/clockOut", {
          method: 'POST',
          body: JSON.stringify(this.AttendanceRequest),
          headers: {"Content-type": "application/json"}
        });
      })
      .then(res => res.json())
      .then(data => {
        if (data.status === true) {
          console.log(data);
          this.toastr.success(data.message, 'Success');
        } else {
          console.log("false: " + data);
          this.toastr.warning(data.message, 'ClockIn Failed');
        }
      })
      .catch(error => {
        this.toastr.error('System error', 'Error');
      });
  }
}
