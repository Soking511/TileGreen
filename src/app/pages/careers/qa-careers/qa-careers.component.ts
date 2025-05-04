import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { NgFor, NgIf, NgClass, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { SeoService } from '../../../../services/seo.service';

interface FaqItem {
  question: string;
  answer: string;
  isOpen: boolean;
  keyHighlights?: string[];
}

@Component({
  selector: 'app-qa-careers',
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './qa-careers.component.html',
  standalone: true,
})
export class QaCareersComponent implements OnInit, AfterViewInit {
  faqItems: FaqItem[] = [
    {
      question: 'What benefits do TileGreen employees receive?',
      answer:
        'We offer competitive salary packages, comprehensive health insurance, retirement plans, flexible work arrangements, professional development opportunities, and an eco-friendly workplace with sustainability initiatives.',
      isOpen: false,
      keyHighlights: [
        'Comprehensive health and wellness benefits',
        'Competitive salary with performance bonuses',
        'Flexible work arrangements when possible',
        '401(k) matching program',
        'Professional development budget',
      ],
    },
    {
      question: 'Do you offer remote work options?',
      answer:
        'Yes, depending on the role. Many positions at TileGreen offer flexible or hybrid work arrangements. Some roles, particularly in manufacturing and R&D, require on-site presence, while others allow for remote or hybrid options.',
      isOpen: false,
      keyHighlights: [
        'Hybrid model for most office-based positions',
        'Fully remote options for select roles',
        'Flexible schedules for work-life balance',
        'Well-equipped on-site facilities for in-person work',
      ],
    },
    {
      question: 'What is the interview process like?',
      answer:
        'Our interview process typically includes an initial screening call, followed by one or two technical or role-specific interviews, and a final conversation with the hiring manager or team lead. We focus on both technical skills and culture fit.',
      isOpen: false,
      keyHighlights: [
        'Initial HR screening (30 minutes)',
        'Role-specific technical interview (45-60 minutes)',
        'Team fit and culture assessment',
        'Final interview with hiring manager',
        'Typical process takes 2-3 weeks',
      ],
    },
    {
      question: 'Do you sponsor work visas?',
      answer:
        'Yes, for certain specialized positions, we do provide visa sponsorship for qualified international candidates. This is evaluated on a case-by-case basis depending on the specific role and requirements.',
      isOpen: false,
      keyHighlights: [
        'H-1B visa sponsorship for specialized roles',
        'Support for green card applications for long-term employees',
        'Relocation assistance for international hires',
        'Legal support throughout the visa process',
      ],
    },
    {
      question: 'What career growth opportunities are available?',
      answer:
        'TileGreen offers clear career advancement paths, mentorship programs, continuous education allowances, cross-functional project opportunities, and leadership development programs to help employees grow within the organization.',
      isOpen: false,
      keyHighlights: [
        'Structured career progression frameworks',
        'Regular performance reviews and feedback',
        'Internal mobility across departments',
        'Leadership development program',
        'Tuition reimbursement for relevant education',
      ],
    },
  ];

  constructor(
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    // Add any initialization logic here
  }

  ngAfterViewInit(): void {
    // Add FAQ structured data for better search results
    if (isPlatformBrowser(this.platformId)) {
      this.addFaqStructuredData();
    }
  }

  private addFaqStructuredData(): void {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': this.faqItems.map(item => ({
        '@type': 'Question',
        'name': item.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.answer
        }
      }))
    };

    // Create script element for JSON-LD
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(faqSchema);
    this.document.head.appendChild(script);
  }

  toggleItem(item: FaqItem): void {
    // Close other items when opening a new one (accordion behavior)
    if (!item.isOpen) {
      this.faqItems.forEach((faqItem) => {
        if (faqItem !== item) {
          faqItem.isOpen = false;
        }
      });
    }
    // Toggle the clicked item
    item.isOpen = !item.isOpen;
  }
}
