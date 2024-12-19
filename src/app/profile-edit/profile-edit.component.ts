import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  selectedFile: File | null = null;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  saveProfile() {
    if (this.selectedFile) {
      this.profileService.uploadPicture(this.selectedFile).subscribe(response => {
        console.log('Picture uploaded successfully', response);
      }, error => {
        console.log('Error uploading picture', error);
      });
    }
  }

  cancel() {
    console.log('Profile edit cancelled');
  }
}
