import { OnChangeIndexCallback } from 'react-swipeable-views';

export interface WithBindKeyboard {
  index: number;
  onChangeIndex: OnChangeIndexCallback;
}

export interface WithBindKeyboardProps {
  axis?: "x" | "x-reverse" | "y" | "y-reverse";
  index: number;
  onChangeIndex: OnChangeIndexCallback;
  slidecount?: number;
}

export const bindKeyboard: PropInjector<WithBindKeyboard, WithBindKeyboardProps>;
