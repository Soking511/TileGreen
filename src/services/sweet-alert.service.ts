import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SweetAlertService {
  constructor() {}

  success(title: string, message?: string): Promise<SweetAlertResult> {
    return Swal.fire({
      title,
      text: message,
      icon: 'success',
      confirmButtonText: 'OK',
    });
  }

  error(title: string, message?: string): Promise<SweetAlertResult> {
    return Swal.fire({
      title,
      text: message,
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }

  info(title: string, message?: string): Promise<SweetAlertResult> {
    return Swal.fire({
      title,
      text: message,
      icon: 'info',
      confirmButtonText: 'OK',
    });
  }

  warning(title: string, message?: string): Promise<SweetAlertResult> {
    return Swal.fire({
      title,
      text: message,
      icon: 'warning',
      confirmButtonText: 'OK',
    });
  }

  confirm(
    title: string,
    message: string,
    confirmButtonText = 'Yes',
    cancelButtonText = 'No'
  ): Promise<SweetAlertResult> {
    return Swal.fire({
      title,
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText,
    });
  }

  prompt(
    title: string,
    message: string,
    inputPlaceholder = ''
  ): Promise<SweetAlertResult> {
    return Swal.fire({
      title,
      text: message,
      input: 'text',
      inputPlaceholder,
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
    });
  }

  toast(
    title: string,
    icon: 'success' | 'error' | 'warning' | 'info' | 'question' = 'success',
    position:
      | 'top'
      | 'top-start'
      | 'top-end'
      | 'center'
      | 'center-start'
      | 'center-end'
      | 'bottom'
      | 'bottom-start'
      | 'bottom-end' = 'top-end',
    timer = 3000
  ): Promise<SweetAlertResult> {
    return Swal.fire({
      position,
      icon,
      title,
      showConfirmButton: false,
      timer,
      toast: true,
    });
  }

  custom(options: SweetAlertOptions): Promise<SweetAlertResult> {
    return Swal.fire(options);
  }
}
