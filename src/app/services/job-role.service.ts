import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";
import {JobRole} from "../models";

@Injectable({
  providedIn: 'root'
})
export class JobRoleService {
  private readonly baseUrl: string = `${environment.baseUrl}/jobrole`;

  constructor(private readonly http: HttpClient) {
  }

  persist(data: JobRole): Observable<JobRole | null> {
    return this.http.post<JobRole>(`${this.baseUrl}`, data);
  }

  getAllTitles(): Observable<string[] | null> {
    return this.http.get<string[]>(`${this.baseUrl}/titles`);
  }
}
