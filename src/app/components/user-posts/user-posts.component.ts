import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCallService } from '../../services/api-call.service';
import { NgFor, NgIf } from '@angular/common';
import { Post } from '../../models/post-model';
import { CommentsComponent } from "../comments/comments.component";

@Component({
  selector: 'app-user-posts',
  standalone: true,
  imports: [NgIf, NgFor, CommentsComponent],
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.css'
})
export class UserPostsComponent implements OnInit{

  userId! : string;
  posts: Post[] = [];
  postId! : string;

  constructor(
    private route: ActivatedRoute,
    private apiCallService: ApiCallService,
  ) {}

  ngOnInit(): void {
    //Get userId from link
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id') || '';
      //and use it on api call to get posts
      if (this.userId) {
        this.apiCallService.getUserPosts(this.userId).subscribe(posts => {
          this.posts = posts;
        });
      }
    });
  }
 
  // Track comment visibility in this object
  showComments: { [id: string] : boolean} = {};

  //When toggleComments is clicked, switch comments visibility
  toggleComments(postId: string): void {
    this.showComments[postId] = !this.showComments[postId];
  }
  
}
