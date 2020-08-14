import { SwipeableViewsProps } from 'react-swipeable-views';

export interface ComputeIndexParams {
    children: SwipeableViewsProps['children'];
    resistance: SwipeableViewsProps['resistance'];
    startIndex: number;
    startX: number;
    pageX: number;
    viewLength: number;
}

export function computeIndex(
    params: ComputeIndexParams,
): {
    index: number;
    startX: number;
};
