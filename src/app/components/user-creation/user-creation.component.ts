import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User } from '../../models/user-model';
import { ApiCallService } from '../../services/api-call.service';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from "@angular/material/radio";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-creation',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatRadioModule, MatButtonModule],
  templateUrl: './user-creation.component.html',
  styleUrl: './user-creation.component.css'
})
export class UserCreationComponent {
  newUser: User = {
    name: '',
    email: '',
    gender: '',
    status: '',
    id: '',
  };

  constructor(private apiCallService: ApiCallService) {}

  onSubmit(userForm: any): void {
    if(userForm.valid) {
      this.apiCallService.createUser(this.newUser).subscribe(res => {
        console.log(res, this.newUser);
        userForm.reset();
      })
    } 
  }
}

