import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiCallService } from '../../services/api-call.service';
import { Post } from '../../models/post-model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-creation',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './post-creation.component.html',
  styleUrl: './post-creation.component.css'
})
export class PostCreationComponent {
  newPost: Post = {
    id: '',
    user_id: 7439794,
    title: '',
    body: ''
  };

  constructor(private apiCallService: ApiCallService, private snackBar: MatSnackBar){}

  onSubmit(postForm: any): void {
    if (postForm.valid) {
      this.apiCallService.createPost(this.newPost).subscribe(res => {
      postForm.reset();
      this.snackBar.open('Post created successfully', 'Close', {duration: 3000});
      }, (error:any) => {
        let errorMessage = 'Unexpected error'; if (error.error && error.error.length) {
           errorMessage = error.error.map((err: {field: string; message: string;}) => `${err.field} ${err.message}`).join(', ');
           } else if (error.message) {
             errorMessage = error.message;
             }
            this.snackBar.open(errorMessage, 'Close', { duration: 3000 });
      }
    );
    }
  }
}
