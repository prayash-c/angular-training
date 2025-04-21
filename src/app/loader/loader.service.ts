import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loading: boolean = false;

  loadingEvent: BehaviorSubject<boolean> = new BehaviorSubject(true);

  setLoadingState(state: boolean): void {
    this.loading = state;
    this.loadingEvent.next(state);
  }

  getLoadingState(): boolean {
    return this.loading;
  }
}
