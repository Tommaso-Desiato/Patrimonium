import { Component, OnInit } from '@angular/core';
import { CommentsComponent } from "../comments/comments.component";
import { NgFor, NgIf } from '@angular/common';
import { Post } from '../../models/post-model';
import { ApiCallService } from '../../services/api-call.service';

@Component({
  selector: 'app-posts-feed',
  standalone: true,
  imports: [NgIf, NgFor, CommentsComponent],
  templateUrl: './posts-feed.component.html',
  styleUrl: './posts-feed.component.css'
})
export class PostsFeedComponent implements OnInit{
  posts: Post[] = [];

  constructor(
    private apiCallService: ApiCallService,
  ) {}

  ngOnInit(): void {
    this.apiCallService.getAllPosts().subscribe( posts => {
      this.posts = posts;
    });
  }

   // Track comment visibility in this object
   showComments: { [id: string] : boolean} = {};

   //When toggleComments is clicked, switch comments visibility
   toggleComments(postId: string): void {
     this.showComments[postId] = !this.showComments[postId];
   }
}
