import { ErrorHandler } from '@angular/core';
import { throwError } from 'rxjs';
import { NotFound } from '../common/Errors/not-found';
import { AppError } from '../common/Errors/app-error';
import { BadInput } from '../common/Errors/bad-input';

export class HttpErrorHandler {
   public static ErrorHandler(error: Response) {
    if (error.status === 400) {
      return throwError(new BadInput());
    }
    if (error.status === 404) {
      return throwError(new NotFound());
    }
    return throwError(new AppError(error));
  }
}
