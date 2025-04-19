import { Injectable } from '@angular/core';
import { IArticle } from '../app/shared/interfaces/articleInterface';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  articles: IArticle[] = [];

  constructor(private apiService: ApiService) {

    this.apiService.get('Article').subscribe({
      next: (data: IArticle[]) => {
        this.articles = data;
      },
      error: (error) => {},
    });
  }
}
