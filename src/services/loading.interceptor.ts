import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, finalize, tap } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Increment the number of active requests
    this.totalRequests++;

    // Show the loading indicator
    this.loadingService.show();

    return next.handle(request).pipe(
      finalize(() => {
        // Decrement the number of active requests
        this.totalRequests--;

        // If there are no more active requests, hide the loading indicator
        if (this.totalRequests === 0) {
          this.loadingService.hide();
        }
      })
    );
  }
}
