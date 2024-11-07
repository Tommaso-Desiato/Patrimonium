import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ApiCallService } from '../../services/api-call.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let apiCallService: ApiCallService;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule,
        MatDialogModule,
        BrowserAnimationsModule
      ],
      providers: [ApiCallService, AuthService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    apiCallService = TestBed.inject(ApiCallService);
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    const dummyUsers = { users: [{ id: '1', name: 'John Doe', email: 'john@example.com', gender: 'male', status: 'active' }], total: 1 };
    spyOn(apiCallService, 'getUsers').and.returnValue(of(dummyUsers));

    component.ngOnInit();

    expect(component.users).toEqual(dummyUsers.users);
    expect(component.totalUsers).toEqual(dummyUsers.total);
  });

  it('should show snack bar on user delete success', () => {
    const snackBarSpy = spyOn(component['snackBar'], 'open');
    spyOn(apiCallService, 'deleteUser').and.returnValue(of({}));

    component.deleteUser('1');

    expect(snackBarSpy).toHaveBeenCalledWith('User deleted successfully', 'Close', { duration: 3000 });
  });

  it('should open confirmation dialog on delete', () => {
    const dialogSpy = spyOn(component['dialog'], 'open').and.callThrough();

    component.deleteUser('1');

    expect(dialogSpy).toHaveBeenCalled();
  });
});
