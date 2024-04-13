import { Component, OnInit } from '@angular/core';
import { CrudApiService } from '../crud-api.service';
import { MatDialog } from '@angular/material/dialog';
import { DailogBoxComponent } from '../dailog-box/dailog-box.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  constructor(private crudApi: CrudApiService, public dailog: MatDialog) {}

  posts: any = [];
  name: string = '';
  email: string = '';
  age: number = 0;

  updatedData: any = [];

  selectedPostForUpdate: any = {
    id: '',
    name: '',
    email: '',
    age: '',
  };

  ngOnInit(): void {
    this.getAllPosts();
  }

  checkIfFormValidBeforeSubmit(): void {
    if (this.name && this.email && this.age) {
      this.submitForm();
    } else {
      alert('Please fill in all required fields (Name, Email, and Age).');
    }
  }
 submitForm() {
    const newId = this.posts.length + 1;
    let data = {
      id:newId.toString(),
      name: this.name,
      age: this.age,
      email: this.email,
    };

    try{
      this.crudApi.addData(data).subscribe((res) => {
        console.log(res);
      });
    }
   catch(error){
    console.log("Error while posting data", error);
   }
  }

  getAllPosts() {
    this.crudApi.getData().subscribe((data) => {

      console.log("This is data" , data);
      this.posts = data;
    });
  }

  editData(id: string): void {
    const dialogRef = this.dailog.open(DailogBoxComponent, this.posts[id]);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.updatedData = result;

      this.crudApi.getDataById(id.toString()).subscribe((res) => {
        console.log('data before updation', res);
        const finalRes = this.bindData(res, result);
        this.updateData(id, finalRes);
      });
    });
  }

  updateData(id: string, result: any): void {
    this.crudApi.updateData(id.toString(), result).subscribe((res) => {
      // location.reload();
    });
  }

  deleteData(id: string) {
    if (confirm('Are you sure?')) {
      // location.reload();
      this.crudApi.deleteData(id).subscribe((res) => {
        try {
          alert('Delete Successfully');
        } catch (err) {
          console.log(err);
        }
      });
    }
  }

  //function to bind all the data.
  bindData(originalData: any, changedData: any) {
    const finalUpdatedValue: any = {};
    for (const key in changedData) {
      if (changedData[key] !== '' && changedData[key] !== 0) {
        finalUpdatedValue[key] = changedData[key];
      }
    }
    const mergedData = { ...originalData };

    for (const key of Object.keys(finalUpdatedValue)) {
      mergedData[key] = finalUpdatedValue[key];
    }

    return mergedData;
  }
}
