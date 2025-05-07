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

export const fadeInUpAnimation: AnimationReferenceMetadata = animation(
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
          easing: 'ease',
          offset: 0,
        }),
        style({
          opacity: 1,
          transform: 'translate3d(0, 0, 0)',
          easing: 'ease',
          offset: 1,
        }),
      ])
    ),
  ],
  {
    params: {
      duration: '0.3s',
      delay: '0ms',
      distance: '25%',
    },
  }
);

export const fadeOutRightAnimation: AnimationReferenceMetadata = animation(
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
          easing: 'ease',
          offset: 0,
        }),
        style({
          visibility: 'hidden',
          opacity: 0,
          transform: 'translate3d({{ distance }}, 0, 0)',
          easing: 'ease',
          offset: 1,
        }),
      ])
    ),
  ],
  {
    params: {
      duration: '0.6s',
      delay: '0ms',
      distance: '100%',
    },
  }
);

export const fadeOutLeftAnimation: AnimationReferenceMetadata = animation(
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
          easing: 'ease',
          offset: 0,
        }),
        style({
          visibility: 'hidden',
          opacity: 0,
          transform: 'translate3d(-{{ distance }}, 0, 0)',
          easing: 'ease',
          offset: 1,
        }),
      ])
    ),
  ],
  {
    params: {
      duration: '0.6s',
      delay: '0ms',
      distance: '100%',
    },
  }
);

export const fadeInRightAnimation: AnimationReferenceMetadata = animation(
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
          easing: 'ease',
          offset: 0,
        }),
        style({
          opacity: 1,
          transform: 'translate3d(0, 0, 0)',
          easing: 'ease',
          offset: 1,
        }),
      ])
    ),
  ],
  {
    params: {
      duration: '0.6s',
      delay: '0ms',
      distance: '100%',
    },
  }
);

export const fadeInLeftAnimation: AnimationReferenceMetadata = animation(
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
          easing: 'ease',
          offset: 0,
        }),
        style({
          opacity: 1,
          transform: 'translate3d(0, 0, 0)',
          easing: 'ease',
          offset: 1,
        }),
      ])
    ),
  ],
  {
    params: {
      duration: '0.6s',
      delay: '0ms',
      distance: '100%',
    },
  }
);

export const zoomInAnimation: AnimationReferenceMetadata = animation(
  [
    style({ visibility: 'hidden' }),
    animate(
      '{{ duration }} {{ delay }}',
      keyframes([
        style({
          visibility: 'visible',
          opacity: 0,
          transform: 'scale3d(0.3, 0.3, 0.3)',
          easing: 'ease',
          offset: 0,
        }),
        style({
          opacity: 1,
          transform: 'scale3d(1, 1, 1)',
          easing: 'ease',
          offset: 1,
        }),
      ])
    ),
  ],
  {
    params: {
      duration: '0.6s',
      delay: '0s',
      distance: '100%',
    },
  }
);

export const zoomOutAnimation: AnimationReferenceMetadata = animation(
  [
    style({ visibility: 'visible' }),
    animate(
      '{{ duration }} {{ delay }}',
      keyframes([
        style({
          opacity: 1,
          transform: 'scale3d(1, 1, 1)',
          easing: 'ease',
          offset: 0,
        }),
        style({
          opacity: 0,
          transform: 'scale3d(0.3, 0.3, 0.3)',
          visibility: 'hidden',
          easing: 'ease',
          offset: 1,
        }),
      ])
    ),
  ],
  {
    params: {
      duration: '0.6s',
      delay: '0s',
    },
  }
);

export const fadeInAnimation: AnimationReferenceMetadata = animation(
  [
    style({ visibility: 'hidden', opacity: 0 }),
    animate(
      '{{ duration }} {{ delay }}',
      keyframes([
        style({
          visibility: 'visible',
          opacity: 0,
          easing: 'ease',
          offset: 0,
        }),
        style({
          opacity: 1,
          easing: 'ease',
          offset: 1,
        }),
      ])
    ),
  ],
  {
    params: {
      duration: '0.6s',
      delay: '0s',
    },
  }
);

export const fadeOutAnimation: AnimationReferenceMetadata = animation(
  [
    style({ visibility: 'visible', opacity: 1 }),
    animate(
      '{{ duration }} {{ delay }}',
      keyframes([
        style({
          opacity: 1,
          easing: 'ease',
          offset: 0,
        }),
        style({
          opacity: 0,
          visibility: 'hidden',
          easing: 'ease',
          offset: 1,
        }),
      ])
    ),
  ],
  {
    params: {
      duration: '0.6s',
      delay: '0s',
    },
  }
);

export const rotateInAnimation: AnimationReferenceMetadata = animation(
  [
    style({ visibility: 'hidden' }),
    animate(
      '{{ duration }} {{ delay }}',
      keyframes([
        style({
          visibility: 'visible',
          opacity: 0,
          transform: 'rotate3d(0, 0, 1, -200deg)',
          easing: 'ease',
          offset: 0,
        }),
        style({
          opacity: 1,
          transform: 'rotate3d(0, 0, 1, 0deg)',
          easing: 'ease',
          offset: 1,
        }),
      ])
    ),
  ],
  {
    params: {
      duration: '0.5s',
      delay: '0s',
    },
  }
);

export const rotateOutAnimation: AnimationReferenceMetadata = animation(
  [
    style({ visibility: 'visible' }),
    animate(
      '{{ duration }} {{ delay }}',
      keyframes([
        style({
          opacity: 1,
          transform: 'rotate3d(0, 0, 1, 0deg)',
          easing: 'ease',
          offset: 0,
        }),
        style({
          opacity: 0,
          transform: 'rotate3d(0, 0, 1, 200deg)',
          visibility: 'hidden',
          easing: 'ease',
          offset: 1,
        }),
      ])
    ),
  ],
  {
    params: {
      duration: '0.5s',
      delay: '0s',
    },
  }
);

export const bounceInAnimation: AnimationReferenceMetadata = animation(
  [
    style({ visibility: 'hidden' }),
    animate(
      '{{ duration }} {{ delay }}',
      keyframes([
        style({
          visibility: 'visible',
          opacity: 0,
          transform: 'scale3d(0.3, 0.3, 0.3)',
          easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
          offset: 0,
        }),
        style({
          transform: 'scale3d(1.1, 1.1, 1.1)',
          easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
          offset: 0.2,
        }),
        style({
          transform: 'scale3d(0.9, 0.9, 0.9)',
          easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
          offset: 0.4,
        }),
        style({
          opacity: 1,
          transform: 'scale3d(1.03, 1.03, 1.03)',
          easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
          offset: 0.6,
        }),
        style({
          transform: 'scale3d(0.97, 0.97, 0.97)',
          easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
          offset: 0.8,
        }),
        style({
          opacity: 1,
          transform: 'scale3d(1, 1, 1)',
          easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
          offset: 1,
        }),
      ])
    ),
  ],
  {
    params: {
      duration: '0.35s',
      delay: '0s',
    },
  }
);

export const bounceOutAnimation: AnimationReferenceMetadata = animation(
  [
    style({ visibility: 'visible' }),
    animate(
      '{{ duration }} {{ delay }}',
      keyframes([
        style({
          transform: 'scale3d(0.9, 0.9, 0.9)',
          easing: 'ease',
          offset: 0.2,
        }),
        style({
          opacity: 1,
          transform: 'scale3d(1.1, 1.1, 1.1)',
          easing: 'ease',
          offset: 0.5,
        }),
        style({
          opacity: 1,
          transform: 'scale3d(1.1, 1.1, 1.1)',
          easing: 'ease',
          offset: 0.55,
        }),
        style({
          opacity: 0,
          transform: 'scale3d(0.3, 0.3, 0.3)',
          visibility: 'hidden',
          easing: 'ease',
          offset: 1,
        }),
      ])
    ),
  ],
  {
    params: {
      duration: '0.55s',
      delay: '0s',
    },
  }
);

export const bounceInUpAnimation: AnimationReferenceMetadata = animation(
  [
    style({ visibility: 'hidden' }),
    animate(
      '{{ duration }} {{ delay }}',
      keyframes([
        style({
          visibility: 'visible',
          opacity: 0,
          transform: 'translate3d(0, {{ distance }}, 0)',
          easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
          offset: 0,
        }),
        style({
          opacity: 1,
          transform: 'translate3d(0, -20px, 0)',
          easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
          offset: 0.6,
        }),
        style({
          transform: 'translate3d(0, 10px, 0)',
          easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
          offset: 0.75,
        }),
        style({
          transform: 'translate3d(0, -5px, 0)',
          easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
          offset: 0.9,
        }),
        style({
          opacity: 1,
          transform: 'translate3d(0, 0, 0)',
          easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
          offset: 1,
        }),
      ])
    ),
  ],
  {
    params: {
      duration: '0.6s',
      delay: '0s',
      distance: '100%',
    },
  }
);

export const slideInUpAnimation: AnimationReferenceMetadata = animation(
  [
    style({ visibility: 'hidden' }),
    animate(
      '{{ duration }} {{ delay }}',
      keyframes([
        style({
          visibility: 'visible',
          transform: 'translate3d(0, {{ distance }}, 0)',
          offset: 0,
        }),
        style({
          transform: 'translate3d(0, 0, 0)',
          offset: 1,
        }),
      ])
    ),
  ],
  {
    params: {
      duration: '0.6s',
      delay: '0s',
      distance: '100%',
    },
  }
);

export const slideInDownAnimation: AnimationReferenceMetadata = animation(
  [
    style({ visibility: 'hidden' }),
    animate(
      '{{ duration }} {{ delay }}',
      keyframes([
        style({
          visibility: 'visible',
          transform: 'translate3d(0, -{{ distance }}, 0)',
          offset: 0,
        }),
        style({
          transform: 'translate3d(0, 0, 0)',
          offset: 1,
        }),
      ])
    ),
  ],
  {
    params: {
      duration: '0.6s',
      delay: '0s',
      distance: '100%',
    },
  }
);

export const flipInXAnimation: AnimationReferenceMetadata = animation(
  [
    style({ visibility: 'hidden' }),
    animate(
      '{{ duration }} {{ delay }}',
      keyframes([
        style({
          visibility: 'visible',
          transform: 'perspective(400px) rotate3d(1, 0, 0, 90deg)',
          opacity: 0,
          offset: 0,
        }),
        style({
          transform: 'perspective(400px) rotate3d(1, 0, 0, -20deg)',
          offset: 0.4,
        }),
        style({
          transform: 'perspective(400px) rotate3d(1, 0, 0, 10deg)',
          opacity: 1,
          offset: 0.6,
        }),
        style({
          transform: 'perspective(400px) rotate3d(1, 0, 0, -5deg)',
          offset: 0.8,
        }),
        style({
          transform: 'perspective(400px)',
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

export const flipInYAnimation: AnimationReferenceMetadata = animation(
  [
    style({ visibility: 'hidden' }),
    animate(
      '{{ duration }} {{ delay }}',
      keyframes([
        style({
          visibility: 'visible',
          transform: 'perspective(400px) rotate3d(0, 1, 0, 90deg)',
          opacity: 0,
          offset: 0,
        }),
        style({
          transform: 'perspective(400px) rotate3d(0, 1, 0, -20deg)',
          offset: 0.4,
        }),
        style({
          transform: 'perspective(400px) rotate3d(0, 1, 0, 10deg)',
          opacity: 1,
          offset: 0.6,
        }),
        style({
          transform: 'perspective(400px) rotate3d(0, 1, 0, -5deg)',
          offset: 0.8,
        }),
        style({
          transform: 'perspective(400px)',
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

export const pulseAnimation: AnimationReferenceMetadata = animation(
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
      duration: '0.3s',
      delay: '0s',
      scale: '1.05',
    },
  }
);

export const shakeAnimation: AnimationReferenceMetadata = animation(
  [
    animate(
      '{{ duration }} {{ delay }}',
      keyframes([
        style({ transform: 'translate3d(0, 0, 0)', offset: 0 }),
        style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.1 }),
        style({ transform: 'translate3d(10px, 0, 0)', offset: 0.2 }),
        style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.3 }),
        style({ transform: 'translate3d(10px, 0, 0)', offset: 0.4 }),
        style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.5 }),
        style({ transform: 'translate3d(10px, 0, 0)', offset: 0.6 }),
        style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.7 }),
        style({ transform: 'translate3d(10px, 0, 0)', offset: 0.8 }),
        style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.9 }),
        style({ transform: 'translate3d(0, 0, 0)', offset: 1 }),
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

export const rubberBandAnimation: AnimationReferenceMetadata = animation(
  [
    animate(
      '{{ duration }} {{ delay }}',
      keyframes([
        style({ transform: 'scale3d(1, 1, 1)', offset: 0 }),
        style({ transform: 'scale3d(1.25, 0.75, 1)', offset: 0.3 }),
        style({ transform: 'scale3d(0.75, 1.25, 1)', offset: 0.4 }),
        style({ transform: 'scale3d(1.15, 0.85, 1)', offset: 0.5 }),
        style({ transform: 'scale3d(0.95, 1.05, 1)', offset: 0.65 }),
        style({ transform: 'scale3d(1.05, 0.95, 1)', offset: 0.75 }),
        style({ transform: 'scale3d(1, 1, 1)', offset: 1 }),
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
