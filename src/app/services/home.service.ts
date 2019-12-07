import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  editMode = new Subject<boolean>();
  values: any;

  constructor(private http: HttpClient) {
    this.getValues();
  }

  private getValues() {
    localStorage.getItem('token');
    this.http.get('http://localhost:5000/api/values', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).subscribe(value => {
        this.values = value;
      },
      error => console.log(error));
  }

}
