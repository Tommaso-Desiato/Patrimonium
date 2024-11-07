import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentsComponent } from './comments.component';
import { ApiCallService } from '../../services/api-call.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;
  let apiCallService: ApiCallService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatListModule,
        MatDividerModule
      ],
      declarations: [CommentsComponent],
      providers: [ApiCallService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    apiCallService = TestBed.inject(ApiCallService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load comments on init', () => {
    const dummyComments = [{ post_id: '1', name: 'Commenter', email: 'commenter@example.com', body: 'Nice post!' }];
    spyOn(apiCallService, 'getComments').and.returnValue(of(dummyComments));

    component.postId = '1'; // Set the postId
    component.ngOnInit();

    expect(component.comments).toEqual(dummyComments);
  });

  it('should show snack bar on comment addition error', () => {
    const snackBarSpy = spyOn(component['snackBar'], 'open');
    spyOn(apiCallService, 'addComment').and.returnValue(throwError({ error: [{ field: 'body', message: 'can\'t be blank' }] }));

    const commentForm = { valid: true, reset: jasmine.createSpy('reset') };

    component.onSubmitComment(commentForm);

    expect(snackBarSpy).toHaveBeenCalledWith('body can\'t be blank', 'Chiudi', { duration: 3000 });
  });
});
