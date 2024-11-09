import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsFeedComponent } from './posts-feed.component';
import { ApiCallService } from '../../services/api-call.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Post } from '../../models/post-model';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

describe('PostsFeedComponent', () => {
  let component: PostsFeedComponent;
  let fixture: ComponentFixture<PostsFeedComponent>;
  let apiCallService: jasmine.SpyObj<ApiCallService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ApiCallService', ['getAllPosts']);

    await TestBed.configureTestingModule({
      imports: [
        PostsFeedComponent,
        HttpClientTestingModule,
        MatCardModule,
        MatButtonModule
      ],
      providers: [
        { provide: ApiCallService, useValue: spy },
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ userId: '1' })) } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsFeedComponent);
    component = fixture.componentInstance;
    apiCallService = TestBed.inject(ApiCallService) as jasmine.SpyObj<ApiCallService>;
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
    apiCallService.getAllPosts.and.returnValue(of(dummyResponse));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.posts).toEqual(dummyPosts);
    expect(component.totalPosts).toEqual(dummyPosts.length);
  });

  it('should update posts on search results', () => {
    const searchResults: Post[] = [
      { id: '3', user_id: 3, title: 'Search Result Title 1', body: 'Search Result body 1' }
    ];

    component.onSearchResults(searchResults);
    fixture.detectChanges();

    expect(component.posts).toEqual(searchResults);
  });

  it('should toggle comments visibility', () => {
    const postId = '1';
    expect(component.showComments[postId]).toBeUndefined();

    component.toggleComments(postId);
    expect(component.showComments[postId]).toBeTrue();

    component.toggleComments(postId);
    expect(component.showComments[postId]).toBeFalse();
  });

  it('should change page and load posts', () => {
    const pageEvent: PageEvent = { pageIndex: 1, pageSize: 10, length: 0 };
    const dummyPosts: Post[] = [
      { id: '1', user_id: 1, title: 'Post Title 1', body: 'Post body 1' }
    ];
    const dummyResponse = { posts: dummyPosts, total: dummyPosts.length };
    apiCallService.getAllPosts.and.returnValue(of(dummyResponse));

    component.onPageChange(pageEvent);
    fixture.detectChanges();

    expect(apiCallService.getAllPosts).toHaveBeenCalled();
    expect(component.currentPage).toBe(2);
    expect(component.pageSize).toBe(10);
    expect(component.posts).toEqual(dummyPosts);
  });
});
