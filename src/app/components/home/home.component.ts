import { Component } from '@angular/core';
import { ApiCallService } from '../../services/api-call.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { User } from '../../models/user-model';
import { LoginFormComponent } from "../login-form/login-form.component";




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, AsyncPipe, LoginFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

export class HomeComponent{
  users: User[] = [];

  addUsers(users: User[]) {
   this.users = users;
  };
  
  customUser:User = {
    name: 'Gogo McVoid',
    email: 'gogo@mcvoid.com',
    gender: 'male',
    status: 'active'
  };

  constructor(private apiCall: ApiCallService) {}

  createUser() {
    this.apiCall.createUser(this.customUser).subscribe(data => {
      console.log(data);
   })
  };

}
