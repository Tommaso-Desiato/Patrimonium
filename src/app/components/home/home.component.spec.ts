import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ApiCallService } from '../../services/api-call.service';
import { AuthService } from '../../services/auth.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { PaginatorComponent } from '../paginator/paginator.component';
import { User } from '../../models/user-model';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let apiService: jasmine.SpyObj<ApiCallService>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const apiSpy = jasmine.createSpyObj('ApiCallService', ['getUsers', 'deleteUser']);
    const authSpy = jasmine.createSpyObj('AuthService', [], {authStatus$: of(true)});
    

    await TestBed.configureTestingModule({
      imports: [HomeComponent, MatExpansionModule, PaginatorComponent, CommonModule],
      providers: [
        { provide: ApiCallService, useValue: apiSpy},
        { provide: AuthService, useValue: authSpy}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiCallService) as jasmine.SpyObj<ApiCallService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users from API', () => {
    const mockUsers: User[] = [{
      id: '1',
      name: 'Test Name',
      email: 'test@example.com',
      gender: 'male',
      status: 'active'
    }];
    const total = 1;
  
    apiService.getUsers.and.returnValue(of({ users: mockUsers, total}));

    component.loadUsers();
    expect(component.users).toEqual(mockUsers);
    expect(component.totalUsers).toEqual(total);
  });

  it('should update pagination parameters and reload users on page change', () => {
    spyOn(component, 'loadUsers');
    component.onPageChange({ pageIndex: 1, pageSize: 5} as any);

    expect(component.currentPage).toEqual(2);
    expect(component.pageSize).toEqual(5);
    expect(component.loadUsers).toHaveBeenCalled();
  });

  it('should delete a user and update user list', () => {
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'First User',
        email: 'first@example.com',
        gender: 'male',
        status: 'active'
      },
      {
        id: '2',
        name: 'Second User',
        email: 'second@example.com',
        gender: 'female',
        status: 'inactive'
      }
    ];

    component.users = mockUsers;
    apiService.deleteUser.and.returnValue(of(null));

    component.deleteUser('1');
    expect(apiService.deleteUser).toHaveBeenCalledWith('1');
    expect(component.users.length).toBe(1);
    expect(component.users[0].id).toBe('2');
  });

  it('should set isAuthenticated based on AuthService', () => {
    component.ngOnInit();
    expect(component.isAuthenticated).toBeTrue();
  })
});

