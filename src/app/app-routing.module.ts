import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMemberComponent } from './Add-Member/add-member/add-member.component';
import { LoginComponent } from './authentication/login/login.component';
import { DailyentryComponent } from './Daily/dailyentry/dailyentry.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'DailyEntry', component:DailyentryComponent},
  {path:'AddMember', component:AddMemberComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
