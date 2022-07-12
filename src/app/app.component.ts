import { Component, HostListener, OnInit } from '@angular/core';
import { NotifyService } from './Services/Notification/notify.service';
import { WebsocketserviceService } from './Services/Socketio/websocketservice.service';
import { UserService } from './Services/users/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Client';
  connection:boolean=false;
  constructor(private webservice: WebsocketserviceService, private user: UserService,private notify:NotifyService) {

  }
  ngOnInit() {
    // Uncomment to setUp Socket.io

    this.webservice.listen('testEvent').subscribe((data: any) => {
      let Login = sessionStorage.getItem('isUserLoggedIn');
      let token = this.user.getToken();

      let dataToSend = {
        msg: "success",
        token: token
      };
      this.connection=true
      if (Login) {
        this.webservice.emit('doneEvent', dataToSend);
      } else {
        let dataToSend = {
          msg: "",
        }
        this.webservice.emit('doneEvent', dataToSend);
      }
    });

setTimeout(()=>{
if(!this.connection){
  this.notify.showErrorWithTimeout("Error in Connection","")
}
},5000);
  }

}



// @HostListener('window:beforeunload', ['$event'])
  //   public beforeunloadHandler($event:any) {
  //     this.http.getMethod('login/browserClosed').subscribe(res=>{
  //     },err=>{

  //     })
  //  }