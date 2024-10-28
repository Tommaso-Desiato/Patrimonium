import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ApiCallService } from '../../services/api-call.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [FormsModule, MatInputModule, NgIf, NgFor],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit {
  //Get postId from parent component
  @Input() postId!: string;

  comments: any[] = [];
  newComment = {
    name: '',
    email: '' ,
    body: '',
  };

  constructor(private apiCallService: ApiCallService) {}

  ngOnInit(): void {
    this.loadComments();
    console.log(this.postId);
  }

  loadComments(): void {
    this.apiCallService.getComments(this.postId).subscribe(comments => {
      this.comments = comments;
      console.log(comments);
    })
  }

  onSubmitComment(commentForm: any): void {
    if(commentForm.valid) {
      const commentData = {
        name: this.newComment.name,
        email: this.newComment.email,
        body: this.newComment.body,
        post_id: this.postId,
      };

      this.apiCallService.addComment(commentData).subscribe(comment => {
        console.log(comment);
        this.comments.push(comment);
        commentForm.reset();
      });
    }
  }
}
