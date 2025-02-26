import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";
import {Branch} from "../models";

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private readonly baseUrl: string = `${environment.baseUrl}/branch`;

  constructor(private readonly http: HttpClient) {
  }

  persist(data: Branch): Observable<Branch | null> {
    return this.http.post<Branch>(`${this.baseUrl}`, data);
  }

  getAllNames(): Observable<string[] | null> {
    return this.http.get<string[]>(`${this.baseUrl}/all-names`);
  }
}
