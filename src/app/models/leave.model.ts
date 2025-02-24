export interface LeavePolicy {
  policyId: string;
  noOfPTODays: number;
}

export interface LeaveRequest {
  employeeId: string | null,
  text: string,
  requestDateTime: string,
  startDateTime: string,
  endDateTime: string
}
