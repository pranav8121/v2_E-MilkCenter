import { Injectable } from '@angular/core';
import swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor() { }
  checkError(err:any) {

    switch (err.status) {

      case 0: {
        // swal.fire("सर्व्हर डाउन", "काही वेळानंतर प्रयत्न करा", "error");
        swal.fire("Server Down", "काही वेळानंतर प्रयत्न करा", "error");
        break;
      }
      case 400: {
        swal.fire("Bad Request", "काही वेळानंतर प्रयत्न करा", "error");
        break;
      }
      case 500: {
        //swal.fire("Internal Server Error", "Try After Sometime", "warning");
        swal.fire("Internal Server Error"," काही वेळानंतर प्रयत्न करा "+err.error.result, "error");
        break;
      }
      case 404: {
        swal.fire("File Not Found", "पुन्हा प्रयत्न करा", "warning");
        break;
      }

    }

  }
}
