import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCareersComponent } from "./form-careers/form-careers.component";

interface JobCategory {
  name: string;
  positions: JobPosition[];
}

interface JobPosition {
  title: string;
  description: string;
  expanded: boolean;
  requirements?: string[];
  responsibilities?: string[];
}

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [CommonModule, FormCareersComponent],
  templateUrl: './careers.component.html',
  styleUrl: './careers.component.scss',
})
export class CareersComponent implements OnInit {
  jobCategories: JobCategory[] = [
    {
      name: 'Engineering & Manufacturing',
      positions: [
        {
          title: 'Mechanical Engineer',
          description: 'Design and optimize production machinery',
          expanded: false,
          requirements: [
            'B.S. in Mechanical Engineering or related field',
            'Experience with CAD software',
            'Knowledge of manufacturing processes',
          ],
          responsibilities: [
            'Design mechanical systems for plastic recycling',
            'Optimize machinery for efficiency and sustainability',
            'Collaborate with cross-functional teams',
          ],
        },
        {
          title: 'Automation Engineer',
          description:
            'Implement robotics and automation for scalable production',
          expanded: false,
          requirements: [
            'B.S. in Automation, Robotics, or related field',
            'Experience with industrial automation systems',
            'Programming skills (Python, C++, or similar)',
          ],
          responsibilities: [
            'Design and implement automation systems',
            'Program robotics for manufacturing processes',
            'Troubleshoot and optimize automated systems',
          ],
        },
        {
          title: 'Industrial Designer',
          description: 'Design modular and scalable manufacturing systems',
          expanded: false,
          requirements: [
            'Degree in Industrial Design or related field',
            'Experience with manufacturing processes',
            'Knowledge of sustainable design principles',
          ],
          responsibilities: [
            'Create ergonomic and efficient manufacturing layouts',
            'Design with sustainability and scalability in mind',
            'Work with engineering team to implement designs',
          ],
        },
      ],
    },
    {
      name: 'Business & Operations',
      positions: [
        {
          title: 'Operations Manager',
          description: 'Oversee production, logistics, and quality control.',
          expanded: false,
          requirements: [
            'B.S. in Operations Management or related field',
            'Experience managing manufacturing operations',
            'Strong leadership and communication skills',
          ],
          responsibilities: [
            'Manage day-to-day operations',
            'Ensure quality standards are met',
            'Optimize production efficiency',
          ],
        },
        {
          title: 'Product Manager',
          description:
            "Develop market strategies for TileGreen's materials and products.",
          expanded: false,
          requirements: [
            'B.S. in Marketing, Business, or related field',
            'Experience in product management',
            'Knowledge of sustainable products market',
          ],
          responsibilities: [
            'Develop product roadmaps',
            'Conduct market research',
            'Work with sales team to promote products',
          ],
        },
      ],
    },
  ];

  ngOnInit(): void {
    // Initialize component
  }

  toggleJobExpansion(position: JobPosition): void {
    position.expanded = !position.expanded;
  }

  applyForJob(jobTitle: string): void {
  }
}
