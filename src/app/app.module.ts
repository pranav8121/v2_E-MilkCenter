import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from './authentication/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DailyentryComponent } from './Daily/dailyentry/dailyentry.component';
import { AddMemberComponent } from './Add-Member/add-member/add-member.component';
import { AdvanceComponent } from './Account/advance/advance.component';
import { SupplyComponent } from './Account/supply/supply.component';
import { BillComponent } from './MemberDataHistory/bill/bill.component';
import { ToastrModule } from 'ngx-toastr';
// import { NgxSelectModule } from 'ngx-select-ex';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DailyentryComponent,
    AddMemberComponent,
    AdvanceComponent,
    SupplyComponent,
    BillComponent,
    // NgxSelectModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
    })
  ], 
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
