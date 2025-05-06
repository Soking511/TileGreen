import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { NgIf } from '@angular/common';
import { ProductExpansionSectionComponent } from "../../../product-expansion-section/product-expansion-section.component";

@Component({
  selector: 'app-first-section-apps',
  imports: [SectionHeaderComponent, ButtonComponent, NgIf, ProductExpansionSectionComponent],
  templateUrl: './first-section-apps.component.html',
  styleUrls: ['./first-section-apps.component.scss'],
})
export class FirstSectionAppsComponent {
  @ViewChild('videoPlayer') videoPlayer: ElementRef<HTMLVideoElement> | undefined;
  videoLoaded = false;
  isPlaying = false;

  onVideoLoaded(): void {
    this.videoLoaded = true;
  }

  playVideo(): void {
    if (this.videoPlayer?.nativeElement) {
      this.videoPlayer.nativeElement.play();
      this.isPlaying = true;
    }
  }

  // Listen for when video pauses
  ngAfterViewInit(): void {
    if (this.videoPlayer?.nativeElement) {
      this.videoPlayer.nativeElement.addEventListener('pause', () => {
        this.isPlaying = false;
      });

      this.videoPlayer.nativeElement.addEventListener('play', () => {
        this.isPlaying = true;
      });
    }
  }
}
