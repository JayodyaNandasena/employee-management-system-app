import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable, of} from "rxjs";
import {AttendanceResponse, EmployeeCreate, EmployeeRead, EmployeeUpdate} from "../models";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly baseUrl: string = `${environment.baseUrl}/employee`;

  constructor(private readonly http: HttpClient) {
  }

  // persist


  updateProfile(data: EmployeeUpdate):Observable<EmployeeCreate | null>{
    return this.http.put<EmployeeCreate>(`${this.baseUrl}/profile`, data);
  }

  getById(id: string | null): Observable<EmployeeCreate | null> {
    if (!id) {
      return of(null);
    }
    const params = new HttpParams().set('id', id);
    return this.http.get<EmployeeCreate>(`${this.baseUrl}/by-id`, {params});
  }

  getNameById(id: string | null): Observable<{ name: string } | null> {
    if (!id) {
      return of(null);
    }
    const params = new HttpParams().set('id', id);
    return this.http.get<{ name: string }>(`${this.baseUrl}/name`, {params});
  }
}
