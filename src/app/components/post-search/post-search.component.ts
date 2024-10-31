import { Component, Output, EventEmitter} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Post } from '../../models/post-model';
import { ApiCallService } from '../../services/api-call.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-search',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './post-search.component.html',
  styleUrl: './post-search.component.css'
})
export class PostSearchComponent {
  searchTitle: string = '';
  searchBody: string = '';

  @Output() searchResults = new EventEmitter<Post[]>();

  constructor(private apiCallService: ApiCallService) {}

  onSearch():void {
    this.apiCallService.searchPosts(this.searchTitle, this.searchBody).subscribe(res => {
      this.searchResults.emit(res);
    })
  }

  onClear(): void {
    this.searchTitle = '';
    this.searchBody = '';
    this.searchResults.emit([]);
  }
}
