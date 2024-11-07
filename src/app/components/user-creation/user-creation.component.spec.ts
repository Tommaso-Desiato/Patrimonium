import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCreationComponent } from './user-creation.component';
import { ApiCallService } from '../../services/api-call.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from "@angular/material/radio";
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UserCreationComponent', () => {
  let component: UserCreationComponent;
  let fixture: ComponentFixture<UserCreationComponent>;
  let apiCallService: ApiCallService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserCreationComponent,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatButtonModule,
        MatSnackBarModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [ ApiCallService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCreationComponent);
    component = fixture.componentInstance;
    apiCallService = TestBed.inject(ApiCallService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createUser on form submit and reset form on success', () => {
    const spy = spyOn(apiCallService, 'createUser').and.returnValue(of({}));
    const snackBarSpy = spyOn(component['snackBar'], 'open');
    const userForm = { valid: true, reset: jasmine.createSpy('reset') };

    component.onSubmit(userForm);

    expect(spy).toHaveBeenCalledWith(component.newUser);
    expect(userForm.reset).toHaveBeenCalled();
    expect(snackBarSpy).toHaveBeenCalledWith('User created successfully', 'Close', { duration: 3000 });
  });

  it('should show error message on API error', () => {
    const spy = spyOn(apiCallService, 'createUser').and.returnValue(throwError({ error: [{ field: 'email', message: 'is invalid' }] }));
    const snackBarSpy = spyOn(component['snackBar'], 'open');
    const userForm = { valid: true, reset: jasmine.createSpy('reset') };

    component.onSubmit(userForm);

    expect(spy).toHaveBeenCalledWith(component.newUser);
    expect(userForm.reset).not.toHaveBeenCalled();
    expect(snackBarSpy).toHaveBeenCalledWith('email is invalid', 'Close', { duration: 3000 });
  });
});
