import { Injectable } from '@angular/core';
import {
  animation,
  style,
  animate,
  keyframes,
  AnimationReferenceMetadata,
} from '@angular/animations';

@Injectable({
  providedIn: 'root',
})
export class SiteAnimationsService {}

// Luxury smooth fade in with slight upward movement
export const luxuryFadeIn: AnimationReferenceMetadata = animation(
  [
    style({
      visibility: 'hidden',
    }),
    animate(
      '{{ duration }} {{ delay }}',
      keyframes([
        style({
          visibility: 'visible',
          opacity: 0,
          transform: 'translate3d(0, {{ distance }}, 0)',
          easing: 'cubic-bezier(0.19, 1, 0.22, 1)', // Luxury easing curve
          offset: 0,
        }),
        style({
          opacity: 1,
          transform: 'translate3d(0, 0, 0)',
          easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
          offset: 1,
        }),
      ])
    ),
  ],
  {
    params: {
      duration: '1.5s',
      delay: '0ms',
      distance: '15px',
    },
  }
);

// Elegant fade out with slight downward movement
export const luxuryFadeOut: AnimationReferenceMetadata = animation(
  [
    style({
      visibility: 'visible',
    }),
    animate(
      '{{ duration }} {{ delay }}',
      keyframes([
        style({
          visibility: 'visible',
          opacity: 1,
          transform: 'translate3d(0, 0, 0)',
          easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
          offset: 0,
        }),
        style({
          visibility: 'hidden',
          opacity: 0,
          transform: 'translate3d(0, {{ distance }}, 0)',
          easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
          offset: 1,
        }),
      ])
    ),
  ],
  {
    params: {
      duration: '0.8s',
      delay: '0ms',
      distance: '15px',
    },
  }
);

// Subtle fade in with horizontal movement from right
export const subtleFadeInRight: AnimationReferenceMetadata = animation(
  [
    style({
      visibility: 'hidden',
    }),
    animate(
      '{{ duration }} {{ delay }}',
      keyframes([
        style({
          visibility: 'visible',
          opacity: 0,
          transform: 'translate3d(-{{ distance }}, 0, 0)',
          easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
          offset: 0,
        }),
        style({
          opacity: 1,
          transform: 'translate3d(0, 0, 0)',
          easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
          offset: 1,
        }),
      ])
    ),
  ],
  {
    params: {
      duration: '1s',
      delay: '0ms',
      distance: '40px',
    },
  }
);

// Subtle fade in with horizontal movement from left
export const subtleFadeInLeft: AnimationReferenceMetadata = animation(
  [
    style({
      visibility: 'hidden',
    }),
    animate(
      '{{ duration }} {{ delay }}',
      keyframes([
        style({
          visibility: 'visible',
          opacity: 0,
          transform: 'translate3d({{ distance }}, 0, 0)',
          easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
          offset: 0,
        }),
        style({
          opacity: 1,
          transform: 'translate3d(0, 0, 0)',
          easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
          offset: 1,
        }),
      ])
    ),
  ],
  {
    params: {
      duration: '1s',
      delay: '0ms',
      distance: '40px',
    },
  }
);

// Refined zoom in animation
export const refinedZoomIn: AnimationReferenceMetadata = animation(
  [
    style({ visibility: 'hidden' }),
    animate(
      '{{ duration }} {{ delay }}',
      keyframes([
        style({
          visibility: 'visible',
          opacity: 0,
          transform: 'scale3d(0.95, 0.95, 0.95)',
          easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
          offset: 0,
        }),
        style({
          opacity: 1,
          transform: 'scale3d(1, 1, 1)',
          easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
          offset: 1,
        }),
      ])
    ),
  ],
  {
    params: {
      duration: '1.5s',
      delay: '0s',
    },
  }
);

// Refined zoom out animation
export const refinedZoomOut: AnimationReferenceMetadata = animation(
  [
    style({ visibility: 'visible' }),
    animate(
      '{{ duration }} {{ delay }}',
      keyframes([
        style({
          opacity: 1,
          transform: 'scale3d(1, 1, 1)',
          easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
          offset: 0,
        }),
        style({
          opacity: 0,
          transform: 'scale3d(0.95, 0.95, 0.95)',
          visibility: 'hidden',
          easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
          offset: 1,
        }),
      ])
    ),
  ],
  {
    params: {
      duration: '0.9s',
      delay: '0s',
    },
  }
);

// Elegant clean fade in with no movement
export const elegantFadeIn: AnimationReferenceMetadata = animation(
  [
    style({ visibility: 'hidden', opacity: 0 }),
    animate(
      '{{ duration }} {{ delay }}',
      keyframes([
        style({
          visibility: 'visible',
          opacity: 0,
          easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
          offset: 0,
        }),
        style({
          opacity: 1,
          easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
          offset: 1,
        }),
      ])
    ),
  ],
  {
    params: {
      duration: '0.9s',
      delay: '0s',
    },
  }
);

// Elegant clean fade out with no movement
export const elegantFadeOut: AnimationReferenceMetadata = animation(
  [
    style({ visibility: 'visible', opacity: 1 }),
    animate(
      '{{ duration }} {{ delay }}',
      keyframes([
        style({
          opacity: 1,
          easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
          offset: 0,
        }),
        style({
          opacity: 0,
          visibility: 'hidden',
          easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
          offset: 1,
        }),
      ])
    ),
  ],
  {
    params: {
      duration: '0.9s',
      delay: '0s',
    },
  }
);

// Subtle reveal animation with minimal scaling
export const subtleReveal: AnimationReferenceMetadata = animation(
  [
    style({ visibility: 'hidden', opacity: 0, transform: 'scale(0.98)' }),
    animate(
      '{{ duration }} {{ delay }}',
      keyframes([
        style({
          visibility: 'visible',
          opacity: 0,
          transform: 'scale(0.98)',
          easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
          offset: 0,
        }),
        style({
          opacity: 1,
          transform: 'scale(1)',
          easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
          offset: 1,
        }),
      ])
    ),
  ],
  {
    params: {
      duration: '0.7s',
      delay: '0s',
    },
  }
);

// Premium hover animation for interactive elements
export const premiumHover: AnimationReferenceMetadata = animation(
  [
    animate(
      '{{ duration }} {{ delay }}',
      keyframes([
        style({
          transform: 'translateY(0) scale(1)',
          boxShadow: '0 0 0 rgba(0, 0, 0, 0.1)',
          easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
          offset: 0,
        }),
        style({
          transform: 'translateY(-{{ lift }}) scale({{ scale }})',
          boxShadow: '0 {{ shadowSize }} {{ blurSize }} rgba(0, 0, 0, 0.08)',
          easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
          offset: 1,
        }),
      ])
    ),
  ],
  {
    params: {
      duration: '0.4s',
      delay: '0s',
      lift: '3px',
      scale: '1.01',
      shadowSize: '8px',
      blurSize: '16px',
    },
  }
);

// Soft pulse animation for subtle attention
export const softPulse: AnimationReferenceMetadata = animation(
  [
    animate(
      '{{ duration }} {{ delay }}',
      keyframes([
        style({
          transform: 'scale3d(1, 1, 1)',
          offset: 0,
        }),
        style({
          transform: 'scale3d({{ scale }}, {{ scale }}, {{ scale }})',
          offset: 0.5,
        }),
        style({
          transform: 'scale3d(1, 1, 1)',
          offset: 1,
        }),
      ])
    ),
  ],
  {
    params: {
      duration: '2s',
      delay: '0s',
      scale: '1.03',
    },
  }
);

// Slide in from top animation - subtle
export const subtleSlideDown: AnimationReferenceMetadata = animation(
  [
    style({ visibility: 'hidden' }),
    animate(
      '{{ duration }} {{ delay }}',
      keyframes([
        style({
          visibility: 'visible',
          transform: 'translate3d(0, -{{ distance }}, 0)',
          opacity: 0,
          easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
          offset: 0,
        }),
        style({
          transform: 'translate3d(0, 0, 0)',
          opacity: 1,
          easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
          offset: 1,
        }),
      ])
    ),
  ],
  {
    params: {
      duration: '0.9s',
      delay: '0s',
      distance: '30px',
    },
  }
);

// Slide in from bottom animation - subtle
export const subtleSlideUp: AnimationReferenceMetadata = animation(
  [
    style({ visibility: 'hidden' }),
    animate(
      '{{ duration }} {{ delay }}',
      keyframes([
        style({
          visibility: 'visible',
          transform: 'translate3d(0, {{ distance }}, 0)',
          opacity: 0,
          easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
          offset: 0,
        }),
        style({
          transform: 'translate3d(0, 0, 0)',
          opacity: 1,
          easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
          offset: 1,
        }),
      ])
    ),
  ],
  {
    params: {
      duration: '0.9s',
      delay: '0s',
      distance: '30px',
    },
  }
);

// Refined, subtle text reveal for paragraphs
export const textReveal: AnimationReferenceMetadata = animation(
  [
    style({ visibility: 'hidden', opacity: 0, transform: 'translateY(10px)' }),
    animate(
      '{{ duration }} {{ delay }}',
      keyframes([
        style({
          visibility: 'visible',
          opacity: 0,
          transform: 'translateY(10px)',
          easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
          offset: 0,
        }),
        style({
          opacity: 1,
          transform: 'translateY(0)',
          easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
          offset: 1,
        }),
      ])
    ),
  ],
  {
    params: {
      duration: '0.8s',
      delay: '0s',
    },
  }
);

// Premium card reveal effect with subtle shadow
export const cardReveal: AnimationReferenceMetadata = animation(
  [
    style({
      visibility: 'hidden',
      opacity: 0,
      transform: 'translateY(20px) scale(0.98)',
      boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
    }),
    animate(
      '{{ duration }} {{ delay }}',
      keyframes([
        style({
          visibility: 'visible',
          opacity: 0,
          transform: 'translateY(20px) scale(0.98)',
          boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
          easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
          offset: 0,
        }),
        style({
          opacity: 1,
          transform: 'translateY(0) scale(1)',
          boxShadow: '0 {{ shadowSize }} {{ blurSize }} rgba(0, 0, 0, 0.08)',
          easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
          offset: 1,
        }),
      ])
    ),
  ],
  {
    params: {
      duration: '1s',
      delay: '0s',
      shadowSize: '15px',
      blurSize: '30px',
    },
  }
);

// Subtle background transition
export const subtleBackgroundTransition: AnimationReferenceMetadata = animation(
  [
    animate(
      '{{ duration }} {{ delay }}',
      keyframes([
        style({
          backgroundColor: '{{ startColor }}',
          easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
          offset: 0,
        }),
        style({
          backgroundColor: '{{ endColor }}',
          easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
          offset: 1,
        }),
      ])
    ),
  ],
  {
    params: {
      duration: '0.8s',
      delay: '0s',
      startColor: 'rgba(255, 255, 255, 0)',
      endColor: 'rgba(255, 255, 255, 0.05)',
    },
  }
);

// Elegant rotate in animation
export const elegantRotateIn: AnimationReferenceMetadata = animation(
  [
    style({ visibility: 'hidden' }),
    animate(
      '{{ duration }} {{ delay }}',
      keyframes([
        style({
          visibility: 'visible',
          opacity: 0,
          transform: 'rotate3d(0, 0, 1, -5deg) scale(0.98)',
          easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
          offset: 0,
        }),
        style({
          opacity: 1,
          transform: 'rotate3d(0, 0, 1, 0deg) scale(1)',
          easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
          offset: 1,
        }),
      ])
    ),
  ],
  {
    params: {
      duration: '0.9s',
      delay: '0s',
    },
  }
);

// For backward compatibility, we'll alias the old animation names to the new ones
export const fadeInUpAnimation = luxuryFadeIn;
export const fadeInRightAnimation = subtleFadeInRight;
export const fadeInLeftAnimation = subtleFadeInLeft;
export const zoomInAnimation = refinedZoomIn;
export const zoomOutAnimation = refinedZoomOut;
export const fadeInAnimation = elegantFadeIn;
export const fadeOutAnimation = elegantFadeOut;
export const fadeOutRightAnimation = luxuryFadeOut;
export const fadeOutLeftAnimation = luxuryFadeOut;
export const rotateInAnimation = elegantRotateIn;
export const rotateOutAnimation = elegantFadeOut;
export const bounceInAnimation = refinedZoomIn;
export const bounceOutAnimation = refinedZoomOut;
export const bounceInUpAnimation = subtleSlideUp;
export const slideInUpAnimation = subtleSlideUp;
export const slideInDownAnimation = subtleSlideDown;
export const flipInXAnimation = subtleReveal;
export const flipInYAnimation = subtleReveal;
export const pulseAnimation = softPulse;
export const shakeAnimation = softPulse;
export const rubberBandAnimation = softPulse;
export const elegantFadeInAnimation = elegantFadeIn;
export const subtleRevealAnimation = subtleReveal;
export const premiumHoverAnimation = premiumHover;
