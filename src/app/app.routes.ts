
import { Routes } from '@angular/router';

import { DashboardComponent } from './side-content/dashboard/dashboard.component';
import { UserDetailComponent } from './side-content/user/user-detail/user-detail.component';
import { UserComponent } from './side-content/user/user.component';

export const routes: Routes = [
    {path: "dashboard", component: DashboardComponent },
    {path: "user", component: UserComponent },
    {path: "user/:id", component: UserDetailComponent }
];
