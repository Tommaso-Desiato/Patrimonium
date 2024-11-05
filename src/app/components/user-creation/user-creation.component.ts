import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User } from '../../models/user-model';
import { ApiCallService } from '../../services/api-call.service';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from "@angular/material/radio";
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private apiCallService: ApiCallService, private snackBar: MatSnackBar) {}

  onSubmit(userForm: any): void { 
    if (userForm.valid) { this.apiCallService.createUser(this.newUser).subscribe( res => {
       userForm.reset();
        this.snackBar.open('User created successfully', 'Close', { duration: 3000 });
       },
        (error: any) => {
          let errorMessage = ''; 
           if (error.status === 422) 
            { errorMessage = 'Email already in use'; }
             this.snackBar.open(errorMessage, 'Close', { duration: 3000 });
 });
 }
}
 }