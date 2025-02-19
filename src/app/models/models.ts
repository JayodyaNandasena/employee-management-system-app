export interface LoginRequest {
    username: string,
    password: string
}

export interface EmployeeRead {
    employeeId: string | null,
    firstName: string,
    lastName: string,
    nic: string,
    dob: Date
    profilePicture: string,
    hiredDate: Date,
    address: string,
    email: string,
    gender: string,
    branchName: string,
    jobRoleTitle: string,
    account: {
        username: string,
        password: string,
        isManager: boolean
    }
}

export interface EmployeeCreate {
    employeeId: string,
    firstName: string,
    lastName: string,
    nic: string,
    dob: string
    profilePicture: string,
    hiredDate: string,
    address: string,
    email: string,
    gender: string,
    branchName: string,
    jobRoleTitle: string,
    account: {
        username: string,
        password: string,
        isManager: boolean
    }
}

export interface Branch {
    name: string,
    latitude: Number,
    longitude: Number,
    address: string
}

export interface LeavePolicy {
    policyId: string;
    noOfPTODays: number;
}

export interface SalaryPolicy {
    monthlyBasicSalary: number;
    overtimeSalaryPerHour: number;
    epfPercentage: number;
    etfPercentage: number;
}

export interface ShiftPolicy {
    startTime: string;
    endTime: string;
    totalHours: string;
}

export interface JobRole {
    jobRoleId: string;
    title: string;
    leavePolicy: LeavePolicy;
    salaryPolicy: SalaryPolicy;
    shiftType: string;
    shiftPolicies: ShiftPolicy[];
}

export interface LeaveRequest {
    employeeId: string | null,
    text: string,
    requestDateTime: string,
    startDateTime: string,
    endDateTime: string
}

export interface Salary {
    basicSalary: Number,
    epfPercentage: Number,
    epfAmount: Number,
    etfPercentage: Number,
    etfAmount: Number,
    otHours: Number,
    otPerHour: Number,
    grossOTIncome: Number,
    grossEarnings: Number,
    grossDeductions: Number,
    grossSalary: Number
}