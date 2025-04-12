import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {
  TimeOffApproval, TimeOffRequest,
  TimeOffRequestRead, TimeOffRequestResponse,
  TimeOffUpdateResponse
} from "../models";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TimeOffService {
  private readonly baseUrl: string = `${environment.baseUrl}/timeOff`;

  constructor(private readonly http: HttpClient) {
  }

  persist(data: TimeOffRequest): Observable<TimeOffRequestResponse | null> {
    if (!data) {
      return of(null);
    }
    return this.http.post<TimeOffRequestResponse>(`${this.baseUrl}`, data);
  }

  getByStatus(status: string, requesterId: string | null): Observable<TimeOffRequestRead[] | [] | null> {
    if (!status || !requesterId) {
      return of(null);
    }

    const params = new HttpParams()
      .set('status', status)
      .set('requesterId', requesterId);
    return this.http.get<TimeOffRequestRead[] | []>(`${this.baseUrl}/byStatus`, {params});
  }

  updateStatus(data: TimeOffApproval): Observable<TimeOffUpdateResponse> {
    return this.http.put<TimeOffUpdateResponse>(`${this.baseUrl}`, data);
  }
}
