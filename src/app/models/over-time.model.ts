import {StatusEnum} from "./enums";
import {EmployeeCreate} from "./employee.model";

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
