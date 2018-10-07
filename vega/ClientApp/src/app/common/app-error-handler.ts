import { BadInput } from './Errors/bad-input';
import { NotFound } from './Errors/not-found';
import { ToastrService } from 'ngx-toastr';
import { AppError } from './Errors/app-error';
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
