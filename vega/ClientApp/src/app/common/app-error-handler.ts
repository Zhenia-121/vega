import { AppError } from './Errors/app-error';
import { ErrorHandler } from '@angular/core';
import { BadInput } from './Errors/bad-input';
import { NotFound } from './Errors/not-found';

export class AppErrorHandler implements ErrorHandler {
  handleError(error: AppError): void {
    alert('An unknown error was occurred');
    console.log(error);
  }

}
