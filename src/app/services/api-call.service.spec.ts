import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiCallService } from './api-call.service';
import { User } from '../models/user-model';
import { Post } from '../models/post-model';

describe('ApiCallService', () => {
  let service: ApiCallService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiCallService]
    });
    service = TestBed.inject(ApiCallService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get users', () => {
    const dummyUsers: User[] = [ { id: '1', name: 'John Doe', email: 'john@example.com', gender: 'male', status: 'active' } ];
    
    const expectedResponse = { users: dummyUsers, total: 1 };

    service.getUsers(1, 1).subscribe(response => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(`https://gorest.co.in/public/v2/users?page=1&per_page=1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsers);
  });

  it('should create user', () => {
    const newUser: User = { id: '2', name: 'Jane Doe', email: 'jane@example.com', gender: 'female', status: 'active' };
    service.createUser(newUser).subscribe(user => {
      expect(user).toEqual(newUser);
    });
    const req = httpMock.expectOne(`https://gorest.co.in/public/v2/users`);
    expect(req.request.method).toBe('POST');
    req.flush(newUser);
  });

  it('should delete user', () => {
    const userId = '1';
    service.deleteUser(userId).subscribe();
    const req = httpMock.expectOne(`https://gorest.co.in/public/v2/users/${userId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should get posts', () => {
    const dummyPosts: Post[] = [{ id: '1', user_id: 1, title: 'Post Title', body: 'Post body' }];

    const expectedResponse = {posts: dummyPosts, total: 0};

    service.getAllPosts(1, 1).subscribe((posts: any) => {
      expect(posts).toEqual(expectedResponse);
    });
    const req = httpMock.expectOne(`https://gorest.co.in/public/v2/posts?page=1&per_page=1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPosts);
  });

  it('should create post', () => {
    const newPost: Post = { id: '2', user_id: 1, title: 'New Post', body: 'New post body' };
    service.createPost(newPost).subscribe(post => {
      expect(post).toEqual(newPost);
    });
    const req = httpMock.expectOne(`https://gorest.co.in/public/v2/posts`);
    expect(req.request.method).toBe('POST');
    req.flush(newPost);
  });

  it('should add comment', () => {
    const newComment = {
      post_id: '1',
      name: 'Commenter',
      email: 'commenter@example.com',
      body: 'Nice post!'
    };
    service.addComment(newComment).subscribe(comment => {
      expect(comment).toEqual(newComment);
    });
    const req = httpMock.expectOne(`https://gorest.co.in/public/v2/posts/1/comments`);
    expect(req.request.method).toBe('POST');
    req.flush(newComment);
  });

  it('should get comments for a post', () => {
    const dummyComments = [{ post_id: '1', name: 'Commenter', email: 'commenter@example.com', body: 'Nice post!' }];
    service.getComments('1').subscribe(comments => {
      expect(comments).toEqual(dummyComments);
    });
    const req = httpMock.expectOne(`https://gorest.co.in/public/v2/comments?post_id=1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyComments);
  });
});
