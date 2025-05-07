import { Subject } from 'rxjs';

declare global {
  interface HTMLElement {
    __animationSubject?: Subject<boolean>;
  }
}