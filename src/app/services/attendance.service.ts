import {Injectable} from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {AttendanceResponse, CreateAttendance, ReadAttendance} from "../models/attendance.model";

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

  allByEmployeeID(id: string | null): Observable<null | ReadAttendance[]> {
    if (!id) {
      return of(null);
    }
    const params = new HttpParams().set('employeeId', id);
    return this.http.get<ReadAttendance[]>(`${this.baseUrl}`, {params});
  }
}
