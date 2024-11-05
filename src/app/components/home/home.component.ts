import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../../services/api-call.service';
import { CommonModule} from '@angular/common';
import { User } from '../../models/user-model';
import { LoginFormComponent } from "../login-form/login-form.component";
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from "../header/header.component"; 
import { RouterLinkActive, RouterModule } from '@angular/router';
import { UserPostsComponent } from "../user-posts/user-posts.component";
import { UserSearchComponent } from "../user-search/user-search.component";
import { PaginatorComponent } from "../paginator/paginator.component";
import { PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ LoginFormComponent, HeaderComponent, RouterModule, UserPostsComponent, RouterLinkActive, UserSearchComponent, PaginatorComponent, CommonModule, MatButtonModule, MatCardModule,  MatDividerModule, MatDialogModule, MatSnackBarModule],
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
  addUsers(users: User[]) {
   this.users = users;
  };

  //Change displayed users on search
  onSearchResults(results: User[]): void {
    this.users = results;
  }

  constructor(
    private apiCall: ApiCallService, 
    private authService: AuthService, 
    private dialog: MatDialog, 
    private snackBar: MatSnackBar) {}

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
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiCall.deleteUser(userId).subscribe(() => {
          this.users = this.users.filter( (user: { id: string; }) => user.id !== userId);
          this.snackBar.open('User deleted successfully', 'Close', {duration: 3000});
        }), (error: any) => {
          console.error('Error:',error)
        }
      }
    })
    
  }
}
