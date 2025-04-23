import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-first-section-apps',
  imports: [SectionHeaderComponent, ButtonComponent],
  templateUrl: './first-section-apps.component.html',
})
export class FirstSectionAppsComponent implements OnInit {
  @ViewChild('videoPlayer') videoPlayer: ElementRef<HTMLVideoElement> | undefined;
  videoLoaded = false;
  isPlaying = false;

  ngOnInit(): void {
    // Existing init code
  }

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
