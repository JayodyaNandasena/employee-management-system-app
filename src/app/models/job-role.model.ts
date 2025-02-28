import {LeavePolicy} from "./time-off.model";
import {SalaryPolicy} from "./salary.model";
import {ShiftPolicy} from "./job-shift.model";

export interface JobRole {
  jobRoleId: string;
  title: string;
  leavePolicy: LeavePolicy;
  salaryPolicy: SalaryPolicy;
  shiftType: string;
  shiftPolicies: ShiftPolicy[];
}
