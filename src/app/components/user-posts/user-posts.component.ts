import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCallService } from '../../services/api-call.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-user-posts',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.css'
})
export class UserPostsComponent implements OnInit{
userId! : string;
posts: any[] = [];

constructor(
  private route: ActivatedRoute,
  private apiCallService: ApiCallService,
) {}

ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    this.userId = params.get('id') || '';

    if (this.userId) {
      this.apiCallService.getUserPosts(this.userId).subscribe(posts => {
        this.posts = posts;
        console.log(posts)
      });
    }
  });
  
}
}
