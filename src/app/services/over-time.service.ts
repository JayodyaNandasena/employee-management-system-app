import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../environments/environment";
import {StatusEnum} from "../models";
import {Observable, of} from "rxjs";
import {
  OverTimeApproval,
  OverTimeRequest,
  OverTimeRequestRead, OverTimeRequestResponse,
  OverTimeUpdateResponse
} from "../models/over-time.model";

@Injectable({
  providedIn: 'root'
})
export class OverTimeService {
  private readonly baseUrl: string = `${environment.baseUrl}/overtime`

  constructor(private readonly http: HttpClient) {
  }

  persist(data: OverTimeRequest): Observable<OverTimeRequestResponse | null> {
    if (!data) {
      return of(null);
    }
    return this.http.post<OverTimeRequestResponse>(`${this.baseUrl}`, data);
  }

  loadRequestsByStatus(requesterId: string, status: StatusEnum): Observable<OverTimeRequestRead[] | null> {
    if (!requesterId || !status) {
      return of(null);
    }

    const params = new HttpParams()
      .set('status', status)
      .set('requesterId', requesterId);

    return this.http.get<OverTimeRequestRead[]>(`${this.baseUrl}/byStatus`, {params});
  }

  manageRequests(data: OverTimeApproval): Observable<OverTimeUpdateResponse> {
    return this.http.put<OverTimeUpdateResponse>(`${this.baseUrl}`, data);
  }

}
