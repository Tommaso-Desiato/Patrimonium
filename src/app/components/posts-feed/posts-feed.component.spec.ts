import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsFeedComponent } from './posts-feed.component';
import { ApiCallService } from '../../services/api-call.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Post } from '../../models/post-model';
import { ActivatedRoute } from '@angular/router';

describe('PostsFeedComponent', () => {
  let component: PostsFeedComponent;
  let fixture: ComponentFixture<PostsFeedComponent>;
  let apiCallService: ApiCallService;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PostsFeedComponent,
        HttpClientTestingModule,
        MatCardModule,
        MatButtonModule
      ],
      providers: [ApiCallService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsFeedComponent);
    component = fixture.componentInstance;
    apiCallService = TestBed.inject(ApiCallService);
    route = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load posts on init', () => {
    const dummyPosts: Post[] = [
      { id: '1', user_id: 1, title: 'Post Title 1', body: 'Post body 1' },
      { id: '2', user_id: 2, title: 'Post Title 2', body: 'Post body 2' }
    ];
    const dummyResponse = { posts: dummyPosts, total: dummyPosts.length };
    spyOn(apiCallService, 'getAllPosts').and.returnValue(of(dummyResponse));

    component.ngOnInit();

    expect(component.posts).toEqual(dummyPosts);
    expect(component.totalPosts).toEqual(dummyPosts.length);
  });

});
