import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../../services/api-call.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { User } from '../../models/user-model';
import { LoginFormComponent } from "../login-form/login-form.component";
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from "../header/header.component";
import {MatExpansionModule} from '@angular/material/expansion'; 
import { RouterLinkActive, RouterModule } from '@angular/router';
import { UserPostsComponent } from "../user-posts/user-posts.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, LoginFormComponent, HeaderComponent, MatExpansionModule, RouterModule, UserPostsComponent, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

export class HomeComponent implements OnInit{
  isAuthenticated: boolean = false;
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

  constructor(private apiCall: ApiCallService, private authService: AuthService) {}

  ngOnInit(): void {
    //Subscribe to authentication status
    this.authService.authStatus$.subscribe(status => {
      this.isAuthenticated = status;
      this.apiCall.getUsers().subscribe(res => {
        this.users = res;
      })
    });
  }
  //TODO Remove this test
  createUser() {
    this.apiCall.createUser(this.customUser).subscribe(data => {
      console.log(data);
   })
  };

}
