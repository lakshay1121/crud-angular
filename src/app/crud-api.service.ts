import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CrudApiService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get('http://localhost:5224/api/users');
  }
  addData(data: any) {
    return this.http.post('http://localhost:5224/api/users', data);
  }
  deleteData(id: string) {
    return this.http.delete(`http://localhost:5224/api/users/${id}`);
  }
  updateData(id: string, data: any) {
    return this.http.put(`http://localhost:5224/api/users/${id}`, data);
  }
  getDataById(id: string) {
    return this.http.get(`http://localhost:5224/api/users/${id}`);
  }
}
