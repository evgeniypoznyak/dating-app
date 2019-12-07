import { Component, OnDestroy, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  editMode = false;
  editModeSubscription: Subscription;

  constructor(private homeService: HomeService) {
    this.editModeSubscription = this.homeService.editMode.subscribe(editMode => {
      this.editMode = editMode;
    });
  }

  ngOnInit() {
  }

  onRegisterClick() {
    this.homeService.editMode.next(true);
  }

  ngOnDestroy(): void {
    this.editModeSubscription.unsubscribe();
  }

}
