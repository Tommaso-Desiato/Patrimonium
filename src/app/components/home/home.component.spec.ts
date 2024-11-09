import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ApiCallService } from '../../services/api-call.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of, throwError, BehaviorSubject } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageEvent } from '@angular/material/paginator';
import { User } from '../../models/user-model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let apiCallService: jasmine.SpyObj<ApiCallService>;
  let authService: jasmine.SpyObj<AuthService>;
  let dialog: jasmine.SpyObj<MatDialog>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    const apiSpy = jasmine.createSpyObj('ApiCallService', ['getUsers', 'deleteUser']);
    const authSpy = jasmine.createSpyObj('AuthService', ['authStatus$', 'isAuthenticated']);
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule,
        MatDialogModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: ApiCallService, useValue: apiSpy },
        { provide: AuthService, useValue: authSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    apiCallService = TestBed.inject(ApiCallService) as jasmine.SpyObj<ApiCallService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;

    // Mock the authStatus$ observable
    const authStatusSubject = new BehaviorSubject<boolean>(true);
    authService.authStatus$ = authStatusSubject.asObservable();
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    const dummyUsers = { users: [{ id: '1', name: 'John Doe', email: 'john@example.com', gender: 'male', status: 'active' }], total: 1 };
    apiCallService.getUsers.and.returnValue(of(dummyUsers));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.users).toEqual(dummyUsers.users);
    expect(component.totalUsers).toEqual(dummyUsers.total);
  });

  it('should handle error on load users fails', () => {
    apiCallService.getUsers.and.returnValue(throwError({ error: 'Error loading users' })); 
    const snackBarSpy = snackBar.open;

    component.loadUsers();
    fixture.detectChanges();

    expect(component.users.length).toBe(0);
    expect(snackBarSpy).toHaveBeenCalledWith('Failed to load users', 'Close', { duration: 3000 });
  });

  it('should update users on search results', () => {
    const searchResults: User[] = [
      { id: '2', name: 'Jane Doe', email: 'jane@example.com', gender: 'female', status: 'active' }
    ];

    component.onSearchResults(searchResults);
    fixture.detectChanges();

    expect(component.users).toEqual(searchResults);
  });

  it('should show snack bar on user delete success', () => {
    const snackBarSpy = snackBar.open;

    // Simulate dialog confirmation
    dialog.open.and.returnValue({
      afterClosed: () => of(true)
    } as MatDialogRef<any>);

    apiCallService.deleteUser.and.returnValue(of({}));

    component.deleteUser('1');
    fixture.detectChanges();

    expect(snackBarSpy).toHaveBeenCalledWith('User deleted successfully', 'Close', { duration: 3000 });
  });

  it('should handle user delete fails', () => {
    const snackBarSpy = snackBar.open; 
    dialog.open.and.returnValue({
      afterClosed: () => of(true)
    } as MatDialogRef<any>);

    apiCallService.deleteUser.and.returnValue(throwError({ error: 'Error deleting user' })); 

    component.deleteUser('1'); 
    fixture.detectChanges(); 

    expect(snackBarSpy).toHaveBeenCalledWith('Failed to delete user', 'Close', { duration: 3000 });
  });

  it('should open confirmation dialog on delete', () => {
    const dialogSpy = dialog.open;

    component.deleteUser('1');

    expect(dialogSpy).toHaveBeenCalled();
  });

  it('should change page and load users', () => {
    const pageEvent: PageEvent = { pageIndex: 1, pageSize: 10, length: 0 };
    const dummyUsers = { users: [{ id: '1', name: 'John Doe', email: 'john@example.com', gender: 'male', status: 'active' }], total: 1 };
    apiCallService.getUsers.and.returnValue(of(dummyUsers));

    component.onPageChange(pageEvent);
    fixture.detectChanges();

    expect(apiCallService.getUsers).toHaveBeenCalled();
    expect(component.currentPage).toBe(2);
    expect(component.pageSize).toBe(10);
    expect(component.users).toEqual(dummyUsers.users);
  });
});
