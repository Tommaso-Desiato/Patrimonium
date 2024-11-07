import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostCreationComponent } from './post-creation.component';
import { ApiCallService } from '../../services/api-call.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';

describe('PostCreationComponent', () => {
  let component: PostCreationComponent;
  let fixture: ComponentFixture<PostCreationComponent>;
  let apiCallService: jasmine.SpyObj<ApiCallService>;

  beforeEach(async () => {
    apiCallService = jasmine.createSpyObj('ApiCallService', ['createPost']);
    await TestBed.configureTestingModule({
      imports: [
        PostCreationComponent,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: ApiCallService, useValue: apiCallService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createPost on form submit and show success message', () => {
    const postForm = { valid: true, reset: jasmine.createSpy('reset') };
    apiCallService.createPost.and.returnValue(of({}));
    const snackBarSpy = spyOn(component['snackBar'], 'open');

    component.onSubmit(postForm);

    expect(apiCallService.createPost).toHaveBeenCalledWith(component.newPost);
    expect(postForm.reset).toHaveBeenCalled();
    expect(snackBarSpy).toHaveBeenCalledWith('Post created successfully', 'Close', { duration: 3000 });
  });

  it('should show error message on createPost failure', () => {
    const postForm = { valid: true, reset: jasmine.createSpy('reset') };
    apiCallService.createPost.and.returnValue(throwError({ error: [{ field: 'body', message: 'can\'t be blank' }] }));
    const snackBarSpy = spyOn(component['snackBar'], 'open');

    component.onSubmit(postForm);

    expect(apiCallService.createPost).toHaveBeenCalledWith(component.newPost);
    expect(postForm.reset).not.toHaveBeenCalled();
    expect(snackBarSpy).toHaveBeenCalledWith('body can\'t be blank', 'Close', { duration: 3000 });
  });

  it('should not call createPost if form is invalid', () => {
    const postForm = { valid: false };

    component.onSubmit(postForm);

    expect(apiCallService.createPost).not.toHaveBeenCalled();
  });
  
});
