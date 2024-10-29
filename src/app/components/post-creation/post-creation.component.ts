import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiCallService } from '../../services/api-call.service';
import { Post } from '../../models/post-model';

@Component({
  selector: 'app-post-creation',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule,],
  templateUrl: './post-creation.component.html',
  styleUrl: './post-creation.component.css'
})
export class PostCreationComponent {
  newPost: Post = {
    id: '',
    user_id: 7495030,
    title: '',
    body: ''
  };

  constructor(private apiCallService: ApiCallService){}

  onSubmit(postForm: any): void {
    if (postForm.valid) {
      this.apiCallService.createPost(this.newPost).subscribe(res => {
        console.log(res, this.newPost);
        postForm.reset();
      })
    }
  }
}
