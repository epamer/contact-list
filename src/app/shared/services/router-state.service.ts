import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouterStateService {
  private pathParam$: BehaviorSubject<string> = new BehaviorSubject(null);

  setRouterParam(param: string): void {
    this.pathParam$.next(param);
  }

  getRouterParam(): Observable<string> {
    return this.pathParam$.asObservable();
  }
}
