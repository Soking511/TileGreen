import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor() {}

  validateFile(
    file: File,
    allowedTypes: string[] = ['application/pdf'],
    maxSizeInMB: number = 5
  ): { valid: boolean; errorMessage?: string } {
    // Check file type
    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        errorMessage: `Please upload a valid file type (${allowedTypes.join(
          ', '
        )})`,
      };
    }

    // Check file size
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      return {
        valid: false,
        errorMessage: `File size must be less than ${maxSizeInMB}MB`,
      };
    }

    return { valid: true };
  }

  processFileInput(
    event: Event,
    allowedTypes: string[] = ['application/pdf'],
    maxSizeInMB: number = 5
  ): { file: File | null; errorMessage?: string } {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const validation = this.validateFile(file, allowedTypes, maxSizeInMB);

      if (validation.valid) {
        return { file };
      } else {
        return { file: null, errorMessage: validation.errorMessage };
      }
    }

    return { file: null };
  }

  processFileDrop(
    event: DragEvent,
    allowedTypes: string[] = ['application/pdf'],
    maxSizeInMB: number = 5
  ): { file: File | null; errorMessage?: string } {
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      const validation = this.validateFile(file, allowedTypes, maxSizeInMB);

      if (validation.valid) {
        return { file };
      } else {
        return { file: null, errorMessage: validation.errorMessage };
      }
    }

    return { file: null };
  }
}
