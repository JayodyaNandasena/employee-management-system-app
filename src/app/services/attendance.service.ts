import {Injectable} from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {CreateAttendance} from "../models/create-attendance";
import {AttendanceResponse} from "../models/attendance-response";

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private readonly baseUrl: string = `${environment.baseUrl}/attendance`;

  constructor(private readonly http: HttpClient) {
  }

  clockIn(data: CreateAttendance): Observable<AttendanceResponse | null> {
    if (!data) {
      return of(null);
    }
    return this.http.post<AttendanceResponse>(`${this.baseUrl}/clockIn`, data);
  }

  clockOut(data: CreateAttendance): Observable<AttendanceResponse | null> {
    if (!data) {
      return of(null);
    }
    return this.http.post<AttendanceResponse>(`${this.baseUrl}/clockOut`, data);
  }
}
