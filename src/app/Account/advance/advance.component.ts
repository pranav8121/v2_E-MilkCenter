import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorHandlingService } from 'src/app/Services/error-handling/error-handling.service';
import { HttpService } from 'src/app/Services/http/http.service';
import { NotifyService } from 'src/app/Services/Notification/notify.service';
import { UserService } from 'src/app/Services/users/user.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-advance',
  templateUrl: './advance.component.html',
  styleUrls: ['./advance.component.css']
})
export class AdvanceComponent implements OnInit {
  No: any;
  Name: any;
  UId: any;
  frm_Advance: any = new FormGroup({
    'Amount': new FormControl(null, [Validators.required]),
  });
  constructor(private notify: NotifyService,
    private http: HttpService,
    private user: UserService,
    private errorHandling: ErrorHandlingService,) {
    this.No = this.user.getMemberNo();
    this.Name = this.user.getMemberName();
    this.UId = this.user.getUId();
  }

  ngOnInit(): void {
  }
  onSave() {
    let data = {
      addAmount: this.frm_Advance.get('Amount').value,
      type: 'advance',
      No: this.No,
      Name: this.Name,
      UId: this.UId
    };
    swal.fire({
      title: `Confirm Add ${this.frm_Advance.get('Amount').value}`,
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#3085D6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel"
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.http.postMethod('Advance/postAdvance', data).subscribe((res: any) => {
          console.log(res.result);
          if (res.result == 'Data Added Successfully') {
            console.log("SuccesFull");
          } else {
            console.log("UnsuccesFull");
          }
        }, (err: any) => {
          console.log(err);
          this.errorHandling.checkError(err);
        });
      }
    },
      function (dismiss) { })
  }
}
