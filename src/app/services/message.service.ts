import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Message} from "../models";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private readonly baseUrl: string = `${environment.baseUrl}/messages`;

  constructor(private readonly http: HttpClient) {
  }

  getMessageList(employeeId: string): Observable<Message[]> {
    const params = new HttpParams().set('employeeId', employeeId);

    return this.http.get<Message[]>(`${this.baseUrl}`, {params});
  }
}
