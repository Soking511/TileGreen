import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ICompany } from '../app/shared/interfaces/companiesInterface';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  companies: ICompany[] | undefined;
  icons: ICompany[] | undefined;

  constructor(private apiService: ApiService) {
    this.apiService.get('IconCompany').subscribe({
      next: (data: ICompany[]) => {
        this.companies = data;
      },
      error: (error) => {},
    });

    // this.apiService.get('IconCompany').subscribe({
    //   next: (data: ICompany[]) => {
    //     this.icons = data;
    //   },
    //   error: (error) => {},
    // });
  }


}
