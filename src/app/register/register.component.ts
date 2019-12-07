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

  constructor(private homeService: HomeService, private authService: AuthService) {
    this.editModeSubscription = this.homeService.editMode.subscribe(editMode => {
      this.editMode = editMode;
    });
  }

  ngOnInit() {
  }

  register() {
    console.log(this.model);
    this.authService.register(this.model).subscribe((data: Data) => {
      console.log(data);

    }, error => console.log('ERROR: ', error));
    this.homeService.editMode.next(false);
  }

  cancel() {
    console.log('cancel');
    this.homeService.editMode.next(false);
  }

  ngOnDestroy(): void {
    this.editModeSubscription.unsubscribe();
  }

}
