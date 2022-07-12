import { Component, OnInit } from '@angular/core';
import { ErrorHandlingService } from 'src/app/Services/error-handling/error-handling.service';
import { HttpService } from 'src/app/Services/http/http.service';
import { UserService } from 'src/app/Services/users/user.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  constructor(private user: UserService, private http: HttpService, private error: ErrorHandlingService) {
  }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    let data = {};
    Object.assign(data, { UId: this.user.getUId() }, { No: this.user.getMemberNo() }, { BillDetails: this.user.getBillDetails() });
    console.log(data);
    this.http.postMethod('DailyData/getBill', data).subscribe((res: any) => {
      console.log(res);
    }, (err: any) => {
      console.log(err);
      this.error.checkError(err);
    });
  }
}
