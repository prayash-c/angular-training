import { Component, OnInit } from '@angular/core';
import { LoaderService } from './loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'customer-web-app';

  constructor(private loaderService: LoaderService) {}

  loadingState: boolean = false;

  ngOnInit(): void {
    this.loaderService.loadingEvent.subscribe({
      next: (res: boolean) => {
        this.loadingState = res;
      },
    });
  }
}
