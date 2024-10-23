import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ApiCallService } from '../../services/api-call.service';
import { NgFor, NgIf } from '@angular/common';
import { response } from 'express';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [FormsModule, MatInputModule, NgIf, NgFor],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {
  //Get postId from parent component
  @Input() postId!: string;

  comments: any[] = [];
  newComment = {
    name: '',
    email: '' ,
    body: '',
  };

  constructor(private apiCallService: ApiCallService) {}

  onSubmitComment(commentForm: any): void {
    if(commentForm.valid) {
      const commentData = {
        name: this.newComment.name,
        email: this.newComment.email,
        body: this.newComment.body,
        post_id: this.postId,
      };

      this.apiCallService.addComment(commentData).subscribe(res => {
        console.log(res);
        this.apiCallService.getComments(commentData.post_id).subscribe( comments => {
          this.comments = comments;
        });
        commentForm.reset();
      })
    }
  }
}
