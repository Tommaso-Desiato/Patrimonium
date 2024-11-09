import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthService } from '../../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { BehaviorSubject } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService;
  let authStatusSubject: BehaviorSubject<boolean>;

  beforeEach(async () => {
    authStatusSubject = new BehaviorSubject<boolean>(true);

    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        RouterTestingModule,
        MatToolbarModule,
        MatButtonModule
      ],
      providers: [
        { provide: AuthService, useValue: { authStatus$: authStatusSubject.asObservable(), logout: jasmine.createSpy('logout') } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout on logout button click', () => {
    const logoutSpy = spyOn(component, 'logout').and.callThrough();
    component.isAuthenticated = true;
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('button#logout-button');
    expect(button).not.toBeNull();
    button.click();
    expect(logoutSpy).toHaveBeenCalled();
  });

  it('should update isAuthenticated based on authStatus$', () => {
    authStatusSubject.next(false);
    fixture.detectChanges();
    expect(component.isAuthenticated).toBeFalse();
  });
});
