import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'; import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css'
})
export class DeleteDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>) {} onNoClick(): void { this.dialogRef.close(); }
}
