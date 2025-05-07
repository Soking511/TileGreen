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
      duration: '1s',
      delay: '300ms',
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
      duration: '1s',
      delay: '300ms',
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
      duration: '1s',
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
      duration: '1s',
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
      duration: '1s',
      delay: '300ms',
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
      duration: '0.75s',
      delay: '0.25s',
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
      duration: '0.75s',
      delay: '0s',
    },
  }
);
