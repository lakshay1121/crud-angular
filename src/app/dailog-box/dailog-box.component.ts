import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  id: string;
  name: string;
  email: string;
  age: string;
}

@Component({
  selector: 'app-dailog-box',
  templateUrl: './dailog-box.component.html',
  styleUrl: './dailog-box.component.css',
})
export class DailogBoxComponent {
  name: string = '';
  email: string = '';
  age: number = 0;

  constructor(
    public dialogRef: MatDialogRef<DailogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    console.log('this is data form other compononet', data);
  }

  getModifiedValues(): void {
    let data = {
      name: this.name,
      email: this.email,
      age: this.age,
    };

    this.dialogRef.close(data);
  }
}
