import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { ManageLeavesComponent } from './component/manage-leaves/manage-leaves.component';
import { ManageOtComponent } from './component/manage-ot/manage-ot.component';
import { ProfileComponent } from './component/profile/profile.component';
import { RequestLeavesComponent } from './component/request-leaves/request-leaves.component';
import { RequestOtComponent } from './component/request-ot/request-ot.component';
import { ManageEmployeeComponent } from './component/manage-employee/manage-employee.component';
import { SalarySlipComponent } from './component/salary-slip/salary-slip.component';
import { ManageAttendanceComponent } from './component/manage-attendance/manage-attendance.component';
import { MessagesComponent } from './component/messages/messages.component';
import {DashboardComponent} from "./component/dashboard/dashboard.component";

export const routes: Routes = [
    {
        path:"dashboard",
        component: DashboardComponent
    },
    {
        path:"manageLeaves",
        component: ManageLeavesComponent
    },
    {
        path:"manageOT",
        component: ManageOtComponent
    },
    {
        path:"profile",
        component: ProfileComponent
    },
    {
        path:"requestLeaves",
        component: RequestLeavesComponent
    },
    {
        path:"requestOT",
        component: RequestOtComponent
    },
    {
        path:"manageEmployee",
        component: ManageEmployeeComponent
    },
    {
        path:"manageAttendance",
        component: ManageAttendanceComponent
    },
    {
        path:"salary",
        component: SalarySlipComponent
    },
    {
        path:"messages",
        component: MessagesComponent
    },
    {
        path:"",
        component: LoginComponent
    }
];
