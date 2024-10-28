import { Component, Output, EventEmitter, OnInit} from '@angular/core';
import {MatFormFieldModule,} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { ApiCallService } from '../../services/api-call.service';
import { User } from '../../models/user-model';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatTooltip, FormsModule, NgIf],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements OnInit {

  constructor(private apiCall: ApiCallService, private authService: AuthService) {}
  
  ngOnInit(): void {
    //Subscribe to authentication status
    this.authService.authStatus$.subscribe(status => {
      this.isAuthenticated = status;
    });
  }
  
  userToken: string = '';
  isAuthenticated : boolean = false;
  usersPerPage: number = 10;
  currentPage: number = 1;

  @Output() submitEvent = new EventEmitter<any>();

  onLogin():void {
    this.authService.saveToken(this.userToken);

    this.apiCall.getUsers(this.currentPage, this.usersPerPage).subscribe(res => {
      this.submitEvent.emit(res);
    });

    this.isAuthenticated = true;
  }
}
