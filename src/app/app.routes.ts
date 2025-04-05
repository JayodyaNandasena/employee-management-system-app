import {Routes} from '@angular/router';
import {LoginComponent} from './component/login/login.component';
import {ManageLeavesComponent} from './component/manage-leaves/manage-leaves.component';
import {ManageOtComponent} from './component/manage-ot/manage-ot.component';
import {ProfileComponent} from './component/profile/profile.component';
import {RequestLeavesComponent} from './component/request-leaves/request-leaves.component';
import {RequestOtComponent} from './component/request-ot/request-ot.component';
import {ManageEmployeeComponent} from './component/manage-employee/manage-employee.component';
import {SalarySlipComponent} from './component/salary-slip/salary-slip.component';
import {ManageAttendanceComponent} from './component/manage-attendance/manage-attendance.component';
import {MessagesComponent} from './component/messages/messages.component';
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {AuthGuard} from "./guards/auth.guard";
import {RoleGuard} from "./guards/role.guard";
import {UserRoles} from "./models";
import {UnauthorizedComponent} from "./component/errors/unauthorized/unauthorized.component";

export const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "manageLeaves",
    component: ManageLeavesComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRoles: [
        UserRoles.SUPER_ADMIN,
        UserRoles.BRANCH_MANAGER,
        UserRoles.DEPARTMENT_MANAGER
      ]
    }
  },
  {
    path: "manageOT",
    component: ManageOtComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRoles: [
        UserRoles.SUPER_ADMIN,
        UserRoles.BRANCH_MANAGER,
        UserRoles.DEPARTMENT_MANAGER
      ]
    }
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "requestLeaves",
    component: RequestLeavesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "requestOT",
    component: RequestOtComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRoles: [
        UserRoles.SUPER_ADMIN,
        UserRoles.USER
      ]
    }
  },
  {
    path: "manageEmployee",
    component: ManageEmployeeComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRoles: [
        UserRoles.SUPER_ADMIN,
        UserRoles.BRANCH_MANAGER,
        UserRoles.DEPARTMENT_MANAGER
      ]
    }
  },
  {
    path: "manageAttendance",
    component: ManageAttendanceComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRoles: [
        UserRoles.SUPER_ADMIN,
        UserRoles.BRANCH_MANAGER,
        UserRoles.DEPARTMENT_MANAGER
      ]
    }
  },
  {
    path: "salary",
    component: SalarySlipComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "messages",
    component: MessagesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "unauthorized",
    component: UnauthorizedComponent,
    canActivate: [AuthGuard]
  },
];
