import {StatusEnum} from "./enums";
import {EmployeeCreate} from "./employee.model";

export interface OverTimeRequest {
  employeeId: string|null;
  requestDate: Date;
  date:string | null | undefined;
  startTime: string | null | undefined;
  endTime: string | null | undefined;
  text: string | null | undefined;
  status: StatusEnum;
}

export interface OverTimeRequestResponse {
  status: boolean,
  message: string,
}

export interface OverTimeRequestRead {
  requestId: string;
  employee: EmployeeCreate;
  date: string;
  startTime: string;
  endTime: string;
  text: string;
  statusEnum: StatusEnum;
}

export interface OverTimeApproval {
  managerId: string;
  requestId: string;
  status: StatusEnum;
  approvedDateTime: string;
}

export interface OverTimeUpdateResponse {
  status: boolean;
  message: string;
}
