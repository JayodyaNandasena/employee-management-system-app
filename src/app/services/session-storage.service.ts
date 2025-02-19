import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  constructor() { }

  setEmployeeId(id: string): void {
    sessionStorage.setItem('employeeId', id);
  }

  getEmployeeId(): string | null {
    return sessionStorage.getItem('employeeId');
  }

  setEmployeeName(name: string): void {
    sessionStorage.setItem('employeeName', name);
  }

  getEmployeeName(): string | null {
    return sessionStorage.getItem('employeeName');
  }

  setIsManager(manager: boolean): void {
    sessionStorage.setItem('isManager', manager.toString());
  }

  getIsManager(): boolean {
    return sessionStorage.getItem('isManager') === 'true';
  }

  clearSession(): void {
    sessionStorage.setItem('employeeId', "");
  }
}
