import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [MatPaginatorModule,],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent {
  @Input() totalItems = 0;
  @Input() itemsPerPage = 10;
  @Input() currentPage = 1;
  @Output() pageChange = new EventEmitter<PageEvent>();

  //Get Page event and add 1
  onPageChange(event: PageEvent): void {
    this.pageChange.emit(event);
  }
}
