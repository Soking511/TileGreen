import { Injectable } from '@angular/core';
import { IFaqItem } from '../app/shared/interfaces/FaqInterface';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class QaService {
  qaArray: IFaqItem[] | undefined = [];

  constructor(private apiService: ApiService) {
    this.apiService.get('QuestionAnswer').subscribe({
      next: (data: IFaqItem[]) => {
        this.qaArray = data;
      },
      error: (error) => {},
    });
  }
}
