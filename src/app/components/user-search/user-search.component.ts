import { Component, EventEmitter, Output } from '@angular/core';
import { ApiCallService } from '../../services/api-call.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { User } from '../../models/user-model';

@Component({
  selector: 'app-user-search',
  standalone: true,
  imports: [FormsModule, MatInputModule],
  templateUrl: './user-search.component.html',
  styleUrl: './user-search.component.css'
})
export class UserSearchComponent {
  query: string = '';

  constructor(private apiCallService: ApiCallService) {}

  @Output() searchResults = new EventEmitter<User[]>();

  onSubmit(): void {
    this.apiCallService.searchByName(this.query).subscribe(res => {
      this.searchResults.emit(res);
      console.log(res);
    })
  }
}
