import { PropInjector } from '@material-ui/types';
import * as React from 'react';
import { OnChangeIndexCallback, OnTransitionEndCallback } from 'react-swipeable-views';

export interface SlideRenderProps {
  index: number;
  key: number;
}

export type SlideRendererCallback = (render: SlideRenderProps) => React.ReactNode;

export interface WithVirtualize {
  index: number;
  onChangeIndex: OnChangeIndexCallback;
  slideRenderer: (render: SlideRendererCallback) => React.ReactNode;
}

export interface WithVirtualizeProps {
  index: number;
  onChangeIndex: OnChangeIndexCallback;
  onTransitionEnd?: OnTransitionEndCallback;
  overscanSlideAfter?: number;
  overscanSlideBefore?: number;
  slideCount?: number;
  children?: React.ReactNode;
  slideRenderer: SlideRendererCallback;
}

export const virtualize: PropInjector<WithVirtualize, WithVirtualizeProps>;
