import { Component, OnDestroy, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Data } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  editModeSubscription: Subscription;
  editMode = false;
  model: any = {};
  selectedFile: File | null = null;

  constructor(private homeService: HomeService, private authService: AuthService) {
    this.editModeSubscription = this.homeService.editMode.subscribe(editMode => {
      this.editMode = editMode;
    });
  }

  ngOnInit() {
  }

  register() {
    const formData = new FormData();
    formData.append('username', this.model.username);
    formData.append('password', this.model.password);
    if (this.selectedFile) {
      formData.append('picture', this.selectedFile, this.selectedFile.name);
    }

    this.authService.register(formData).subscribe((data: Data) => {
      console.log(data);
    }, error => console.log('ERROR: ', error));
    this.homeService.editMode.next(false);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  cancel() {
    console.log('cancel');
    this.homeService.editMode.next(false);
  }

  ngOnDestroy(): void {
    this.editModeSubscription.unsubscribe();
  }

}
