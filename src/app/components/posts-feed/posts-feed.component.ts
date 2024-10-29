import { Component, OnInit } from '@angular/core';
import { CommentsComponent } from "../comments/comments.component";
import { NgFor, NgIf } from '@angular/common';
import { Post } from '../../models/post-model';
import { ApiCallService } from '../../services/api-call.service';
import { PaginatorComponent } from "../paginator/paginator.component";
import { PageEvent } from '@angular/material/paginator';
import { PostCreationComponent } from "../post-creation/post-creation.component";
import { RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-posts-feed',
  standalone: true,
  imports: [NgIf, NgFor, CommentsComponent, PaginatorComponent, PostCreationComponent, RouterModule, RouterLinkActive],
  templateUrl: './posts-feed.component.html',
  styleUrl: './posts-feed.component.css'
})
export class PostsFeedComponent implements OnInit{

  posts: any[] = [];
  //Variables for pagination use
  totalPosts: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;

  constructor(
    private apiCallService: ApiCallService,
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.apiCallService.getAllPosts(this.currentPage, this.pageSize).subscribe( res => {
      this.posts = Array.isArray(res.posts)? res.posts : [res.posts];
      this.totalPosts = res.total;
      console.log(res);
    });
  }

  // Track comment visibility in this object
  showComments: { [id: string] : boolean} = {};

  //When toggleComments is clicked, switch comments visibility
  toggleComments(postId: string): void {
   this.showComments[postId] = !this.showComments[postId];
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadPosts();
  }
}
