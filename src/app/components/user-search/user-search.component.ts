import { Component, EventEmitter, Output } from '@angular/core';
import { ApiCallService } from '../../services/api-call.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { User } from '../../models/user-model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-user-search',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule],
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
    })
  }
}
