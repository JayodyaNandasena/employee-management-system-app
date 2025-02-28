import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Salary} from "../models";

@Injectable({
  providedIn: 'root'
})
export class SalaryService {
  private readonly baseUrl: string = `${environment.baseUrl}/salary`;

  constructor(private readonly http: HttpClient) {
  }

  getSalary(employeeId: string) {
    const params = new HttpParams().set('employeeId', employeeId);

    return this.http.get<Salary>(`${this.baseUrl}`, {params});
  }
}
