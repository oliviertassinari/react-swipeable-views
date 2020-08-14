import { OnChangeIndexCallback, OnSwitchingCallback } from 'react-swipeable-views';
import { PropInjector } from '@material-ui/types';

export interface WithAutoPlay {
  index: number;
  onChangeIndex: OnChangeIndexCallback;
  onSwitching?: OnSwitchingCallback;
}

export interface WithAutoPlayProps {
  autoplay?: boolean;
  direction?: 'incremental' | 'decremental';
  index: number;
  interval?: number;
  onChangeIndex: OnChangeIndexCallback;
  slideCount?: number;
}
export const autoPlay: PropInjector<WithAutoPlay, WithAutoPlayProps>;
