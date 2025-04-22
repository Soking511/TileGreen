import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollRevealTextComponent } from './scroll-reveal-text.component';

describe('ScrollRevealTextComponent', () => {
  let component: ScrollRevealTextComponent;
  let fixture: ComponentFixture<ScrollRevealTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollRevealTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollRevealTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
