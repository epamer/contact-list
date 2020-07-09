import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Mode } from './app.model';

@Injectable({
  providedIn: 'root',
})
export class ModeService {
  private mode: BehaviorSubject<string> = new BehaviorSubject(Mode.DETAILS);
  constructor() {}

  getMode(): Observable<string> {
    return this.mode.asObservable();
  }

  setMode(mode: string): void {
    this.mode.next(mode);
  }
}
