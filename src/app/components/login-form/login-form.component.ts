import { Component, Output, EventEmitter} from '@angular/core';
import {MatFormFieldModule,} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { ApiCallService } from '../../services/api-call.service';
import { User } from '../../models/user-model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatTooltip, FormsModule ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  constructor(private apiCall: ApiCallService, private authService: AuthService) {}
  
  userToken: string = '';

  @Output() submitEvent = new EventEmitter<User[]>();

  onLogin():void {
    this.authService.saveToken(this.userToken);

    this.apiCall.getUsers().subscribe(res => {
      this.submitEvent.emit(res);
    });
  }
}
