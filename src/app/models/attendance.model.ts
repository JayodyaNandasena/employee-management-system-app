export interface CreateAttendance {
  employeeId: string | null;
  date: string | null;
  time: string | null;
  latitude: number | null;
  longitude: number | null;
}

export interface ReadAttendance {
  employeeName: string | null;
  date: string | null;
  timeIn: string | null;
  timeOut: string | null;
  timeSpent: string | null;
}

export interface AttendanceResponse {
  status: boolean;
  message: string;
}
