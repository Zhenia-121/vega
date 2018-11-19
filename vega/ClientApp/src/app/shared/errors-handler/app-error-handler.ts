import { BadInput } from './bad-input';
import { NotFound } from './not-found';
import { ToastrService } from 'ngx-toastr';
import { AppError } from './app-error';
import { ErrorHandler, Inject, NgZone } from '@angular/core';

export class AppErrorHandler implements ErrorHandler {
 constructor(private ngZone: NgZone,
   @Inject(ToastrService) private toastr: ToastrService) {}

  handleError(error: AppError): void {
    this.ngZone.run(() => {
      this.toastr.error('An unexpected error was occured', 'Error');
    });
  }
}
