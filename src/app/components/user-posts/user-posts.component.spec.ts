import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserPostsComponent } from './user-posts.component';
import { ApiCallService } from '../../services/api-call.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

describe('UsersPostComponent', () => {
  let component: UserPostsComponent;
  let fixture: ComponentFixture<UserPostsComponent>;
  let apiCallService: jasmine.SpyObj<ApiCallService>;
  let route: ActivatedRoute;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ApiCallService', ['getUserPosts']);

    await TestBed.configureTestingModule({
      imports: [
        UserPostsComponent,
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

    fixture = TestBed.createComponent(UserPostsComponent);
    component = fixture.componentInstance;
    apiCallService = TestBed.inject(ApiCallService) as jasmine.SpyObj<ApiCallService>;
    route = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user posts on init', () => {
    const dummyPosts = [
      { id: '1', user_id: 1, title: 'Post Title 1', body: 'Post body 1' },
      { id: '2', user_id: 1, title: 'Post Title 2', body: 'Post body 2' }
    ];

    apiCallService.getUserPosts.and.returnValue(of(dummyPosts)); 

    fixture.detectChanges();

    expect(component.posts.length).toBe(0);
    expect(component.posts[0]).toEqual(dummyPosts[0]);
    expect(component.posts[1]).toEqual(dummyPosts[1]);
  });

});
