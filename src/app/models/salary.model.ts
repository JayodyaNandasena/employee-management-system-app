export interface SalaryPolicy {
  monthlyBasicSalary: number;
  overtimeSalaryPerHour: number;
  epfPercentage: number;
  etfPercentage: number;
}

export interface Salary {
  basicSalary: number,
  epfPercentage: number,
  epfAmount: number,
  etfPercentage: number,
  etfAmount: number,
  otHours: number,
  otPerHour: number,
  grossOTIncome: number,
  grossEarnings: number,
  grossDeductions: number,
  grossSalary: number
}
