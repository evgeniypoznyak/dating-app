import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  baseUrl = 'http://localhost:5000/api/profile/';

  constructor(private http: HttpClient) { }

  uploadPicture(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('picture', file, file.name);
    return this.http.post(this.baseUrl + 'upload', formData);
  }
}
