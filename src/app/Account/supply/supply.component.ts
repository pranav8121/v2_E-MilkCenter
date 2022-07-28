import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorHandlingService } from 'src/app/Services/error-handling/error-handling.service';
import { HttpService } from 'src/app/Services/http/http.service';
import { UserService } from 'src/app/Services/users/user.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-supply',
  templateUrl: './supply.component.html',
  styleUrls: ['./supply.component.css']
})
export class SupplyComponent implements OnInit {

  supplyType: any = [
    { value: "sugrass", name: "सुग्रास" },
    { value: "TMR", name: "टि.एम.आर" },
    { value: "fertminePlus", name: "फर्टिमन प्लस" },
    { value: "fertmine", name: "फर्टिमन" },
    { value: "meet", name: "भेट शुल्क" },
    { value: "other", name: "इतर" }
  ];
  today: any = new Date()
  No: any;
  Name: any;
  UId: any;
  get int_bag() {
    return this.frm_supply.get("int_bag");
  };

  get int_rate() {
    return this.frm_supply.get("int_rate");
  };

  get str_date() {
    return this.frm_supply.get("str_date");
  };

  get int_totalRate() {
    return this.frm_supply.get("int_totalRate");
  };

  get str_type() {
    return this.frm_supply.get("str_type");
  };

  frm_supply: any = new FormGroup({
    'str_date': new FormControl(null, [Validators.required]),
    'str_type': new FormControl('सुग्रास', [Validators.required]),
    'int_bag': new FormControl(null, [Validators.required]),
    'int_rate': new FormControl(null, [Validators.required]),
    'int_totalRate': new FormControl('0', [Validators.required]),
  });
  constructor(
    private http: HttpService,
    private user: UserService,
    private errorHandling: ErrorHandlingService) { 
      this.No = this.user.getMemberNo();
      this.Name = this.user.getMemberName();
      this.UId = this.user.getUId();
    }

  ngOnInit(): void {
    this.getData()
  }
  calTotalRate() {
    this.frm_supply.patchValue({
      int_totalRate: 0
    })
    if (this.int_bag.value && this.int_rate.value) {
      let total = parseFloat(this.int_bag.value) * parseFloat(this.int_rate.value);
      this.frm_supply.patchValue({
        int_totalRate: total
      });
    }

  }
  onAdd() {
    let data = {
      date: this.str_date.value,
      supType: this.str_type.value,
      bag: this.int_bag.value,
      rate: this.int_rate.value,
      addAmount: this.int_totalRate.value,
      Name: this.user.getMemberName(),
      UId: this.user.getUId(),
      type: 'supply',
      No: this.user.getMemberNo()
    }
    swal.fire({
      title: `Confirm Add`,
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#3085D6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel"
    }).then((result: any) => {
      this.http.postMethod('Account/postSupply', data).subscribe((res: any) => {
        console.log(res);
      }, err => {
        console.log(err);
        this.errorHandling.checkError(err);
      });
    })

  };

  getData(){
    let data = {
      type: 'supply',
      No: this.No,
      UId: this.UId
    };
    this.http.postMethod('Account/getAccount', data).subscribe((res: any) => {
      console.log(res.result);
    }, err => {
      console.log(err);
      this.errorHandling.checkError(err)
    })
  }
}
