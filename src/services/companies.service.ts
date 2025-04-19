import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ICompany } from '../app/shared/interfaces/companiesInterface';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  companies: ICompany[] | undefined;

  constructor(private apiService: ApiService) {
    this.apiService.get('JointStockCompany').subscribe({
      next: (data: ICompany[]) => {
        this.companies = data;
      },
      error: (error) => {},
    });
  }
}
