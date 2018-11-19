import { ErrorHandler } from '@angular/core';
import { throwError } from 'rxjs';
import { BadInput } from 'src/app/shared/errors-handler/bad-input';
import { NotFound } from 'src/app/shared/errors-handler/not-found';
import { AppError } from 'src/app/shared/errors-handler/app-error';

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
