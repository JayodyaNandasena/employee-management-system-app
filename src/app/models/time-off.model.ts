import {EmployeeCreate} from "./employee.model";
import {StatusEnum} from "./enums";

export interface LeavePolicy {
  policyId: string;
  noOfPTODays: number;
}

export interface TimeOffRequest {
  employeeId: string | null | undefined,
  text: string | null | undefined,
  requestDateTime: string,
  startDateTime: string,
  endDateTime: string
}

export interface TimeOffRequestResponse {
  status: boolean,
  message: string,
}

export interface TimeOffRequestRead {
  employee: EmployeeCreate | null;
  requestId: string | null;
  text: string | null;
  requestDateTime: string | null;
  startDateTime: string | null;
  endDateTime: string | null;
  statusEnum: StatusEnum | null;
}

export interface TimeOffApproval {
  managerId: string | null;
  requestId: string;
  status: StatusEnum;
  approvedDateTime: string;
}

export interface TimeOffUpdateResponse {
  status: boolean;
  message: string;
}
