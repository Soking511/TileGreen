import { Injectable } from '@angular/core';
import { IFaqItem } from '../app/shared/interfaces/FaqInterface';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class QaService {
  qaArray: IFaqItem[] = [
    {
      question: 'What is TileGreen and what problem does it solve?',
      answer:
        "TileGreen is a climate tech company with a patented, machine learning-based technology (TG1.0) that converts unrecyclable plastic waste into high-performance building materials called Re-PAC. Our innovation addresses two major environmental challenges simultaneously: the global plastic waste crisis (400+ million tons produced annually with only 14% recycled) and the high carbon footprint of traditional building materials (16% of global carbon emissions). By transforming plastic waste into durable, sustainable building materials, we're creating a circular economy solution that diverts plastic from landfills while reducing construction's environmental impact.",
    },
    {
      question: "How does TileGreen's technology work?",
      answer:
        'Our TG1.0 technology platform integrates three components to transform plastic waste into high-performance building materials: Patented Process: Our thermomechanical process (WO/2024/173900) includes pre-treatment, precision core processing, and quality-focused post-treatment. Material Intelligence Model: Our machine learning system optimizes production parameters in real-time, ensures consistent quality, and creates digital twins for simulation. Specialized Hardware: Our modular production line features custom mixing units, precision thermal treatment, and advanced compression molds. Unlike traditional recycling that requires clean, sorted plastics, our technology processes mixed and contaminated plastic waste streams, significantly expanding recycling capabilities.',
    },
    {
      question: "What environmental benefits do TileGreen's products deliver?",
      answer:
        "TileGreen's first product, paving tiles, offers substantial environmental advantages: 75% reduction in CO2e emissions compared to conventional alternatives, 62% energy savings in production, 35% water conservation during manufacturing, 99% reduction in curing time versus cement-based products, 100% recyclability at end of life, diversion of plastic waste from landfills and oceans, and 5-10+ years extended product lifetime, reducing replacement frequency. Each Re-PAC tile diverts approximately 1kg of plastic waste, creating measurable environmental impact with every installation.",
    },
    {
      question: "How does TileGreen's licensing model work for manufacturers?",
      answer:
        'Our licensing model enables manufacturers worldwide to implement our TG1.0 technology locally, creating sustainable building materials while addressing regional waste challenges: Initial Assessment: We evaluate your market, waste availability, and manufacturing capabilities. Technology Transfer: We provide the complete TG1.0 platform, including process know-how, Material Intelligence Model, and hardware specifications. Implementation Support: Our team assists with setup, training, and production optimization. Ongoing Partnership: We provide continuous technical support, software updates, and R&D innovations. Licensees benefit from our patented technology, proven market demand, and established brand while maintaining local production control. We currently have licensing MOUs in Malaysia, Canada, and Egypt, with more partnerships developing.',
    },
    {
      question:
        "What makes TileGreen's Re-PAC materials different from other sustainable alternatives?",
      answer:
        'Re-PAC materials stand out through a unique combination of environmental benefits and superior performance: Feedstock Flexibility: Processes virtually all plastic waste streams, unlike competitors limited to specific types. Superior Durability: Doesn\'t crack, rot, rust, erode, or interact with chemicals. Weather Resistance: Exceptional performance in extreme conditions from heat to freezing temperatures. Competitive Pricing: Offers a "green discount, not green premium" with lifetime cost savings. Dual Environmental Impact: Addresses both plastic waste and building material emissions simultaneously. Scalable Technology: Modular approach enables implementation across various geographies and production scales. This combination creates compelling value for construction companies, developers, and end users seeking sustainable solutions without compromise.',
    },
    {
      question:
        "What products does TileGreen currently offer, and what's in development?",
      answer:
        'Our flagship product is outdoor interlocking paving tiles, selected as our initial focus due to lower regulatory barriers and large market size. These tiles are ideal for residential patios, commercial plazas, public parks, parking lots, and pedestrian pathways. Our TG1.0 technology platform can produce over 100 different building material applications. Our product roadmap includes interior applications (wall tiles, flooring, decorative elements), outdoor furniture components, roofing materials, landscaping elements, and infrastructure components. Each new product undergoes rigorous testing before commercial release to ensure it meets our high standards for performance, durability, and environmental impact.',
    },
    {
      question:
        'How do TileGreen products contribute to green building certifications?',
      answer:
        "TileGreen's Re-PAC materials significantly contribute to green building certifications and corporate sustainability targets: LEED Certification: Contributes to Materials & Resources, Innovation, and Regional Priority credits. BREEAM: Supports credits in Materials, Waste, and Innovation categories. Other Standards: Aligns with requirements of 25+ certification systems worldwide. For corporate sustainability initiatives, our products help reduce Scope 3 emissions in construction projects, support circular economy and waste reduction targets, demonstrate tangible environmental action through recycled content, and achieve net-zero carbon goals through lower embodied carbon. We provide comprehensive documentation of environmental benefits to support certification applications and sustainability reporting.",
    },
    {
      question:
        'Who is behind TileGreen and what expertise does the team bring?',
      answer:
        "TileGreen was founded by innovators committed to creating sustainable solutions for global environmental challenges: Amr Shalan, CEO & Co-Founder: Leads business strategy, partnerships, and growth initiatives. Khaled Raafat, CTO & Co-Founder: Directs technology development, R&D, and innovation. Our team is supported by expert advisors in materials engineering, mechanical design, business strategy, and technology development. We've also established partnerships with leading organizations in machine learning, mechanical design, plastic machinery, and manufacturing process development to enhance our capabilities and accelerate growth.",
    },
    {
      question:
        'How can I engage with TileGreen as an investor, potential licensee, or customer?',
      answer:
        "We welcome engagement from stakeholders interested in our mission and technology: For Investors: Contact our CEO directly at amr.shalan@tilegreen.org, request our detailed investor deck and financial projections, schedule a technology demonstration or facility tour. For Potential Licensees: Submit an inquiry through our website's licensing section, provide information about your market and manufacturing capabilities, our team will follow up to discuss partnership opportunities. For Customers: Browse our product catalog on the website, request samples or technical specifications, contact our sales team for quotes and ordering information. For Media and Other Inquiries: Contact our communications team at info@tilegreen.org, follow us on social media for regular updates, subscribe to our newsletter for the latest developments. We're committed to building a more sustainable future through innovation and collaboration, and we look forward to connecting with partners who share our vision.",
    },
  ];

  constructor(private apiService: ApiService) {
    // Commented out API call - using hardcoded data instead
    // this.apiService.get('QuestionAnswer').subscribe({
    //   next: (data: IFaqItem[]) => {
    //     this.qaArray = data;
    //   },
    //   error: (error) => {},
    // });
  }
}
