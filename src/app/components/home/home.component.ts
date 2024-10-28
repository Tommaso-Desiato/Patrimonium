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
import { UserSearchComponent } from "../user-search/user-search.component";
import { PaginatorComponent } from "../paginator/paginator.component";
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, LoginFormComponent, HeaderComponent, MatExpansionModule, RouterModule, UserPostsComponent, RouterLinkActive, UserSearchComponent, PaginatorComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

export class HomeComponent implements OnInit{

  isAuthenticated: boolean = false;
  users: any = [];
  //Variables for pagination use
  totalUsers: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;

  //Add users on login
  addUsers(users: []) {
   this.users = users;
  };

  //Change displayed users on search
  onSearchResults(results: any[]): void {
    this.users = results;
  }

  constructor(private apiCall: ApiCallService, private authService: AuthService) {}

  ngOnInit(): void {
    //Subscribe to authentication status
    this.authService.authStatus$.subscribe(status => {
      this.isAuthenticated = status;
      this.loadUsers();
    });
  }

  //Load users w/pagination params
  loadUsers(): void {
    this.apiCall.getUsers(this.currentPage, this.pageSize).subscribe(res => {
      //Check if users is an array, if false make it an array
      this.users = Array.isArray(res.users) ? res.users : [res.users];
      //Get total users
      this.totalUsers = res.total;
    })
  } 

  //Method to update page Index
  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadUsers();
  }

  deleteUser(userId: string):void {
    this.apiCall.deleteUser(userId).subscribe(() => {
      this.users = this.users.filter( (user: { id: string; }) => user.id !== userId);
    }), (error: any) => {
      console.error('',error)
    }
  }
}
