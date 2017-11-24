# API

## `<SwipeableViews />`

| Name | Type | Default | Platform | Description |
|:-----|:-----|:--------|:---------|:------------|
| action | function(hooks) |  | browser | This is callback property. It's called by the component on mount. This is useful when you want to trigger an action programmatically. It currently only supports updateHeight() action. |
| animateHeight | bool | `false` | browser | If `true`, the height of the container will be animated to match the current slide height. Animating another style property has a negative impact regarding performance. |
| animateTransitions | bool | `true` | all | If `false`, changes to the index prop will not cause an animated transition. |
| axis | enum [`'x'`, `'x-reverse'`, `'y'`, `'y-reverse'`] | `'x'` | browser | The axis on which the slides will slide. |
| children | node | | all | Use this property to provide your slides. |
| containerStyle | object | `{}` | all | Whether or not the auto complete is animated as it is toggled. |
| disabled | bool | `false` | all | If `true`, it will disable touch events. This is useful when you want to prohibit the user from changing slides. |
| disableLazyLoading | bool | false | browser | This is the config used to disable lazy loading, if `true` it will render all the views in first rendering. |
| enableMouseEvents | bool | `false` | browser | If `true`, it will enable mouse events. This will allow the user to perform the relevant swipe actions with a mouse. |
| hysteresis | float | `0.6` | all | Configure hysteresis between slides. This value determines how far should user swipe to switch slide. |
| ignoreNativeScroll | bool | false | browser | If `true`, it will ignore native scroll container. It can be used to filter out false positive that blocks the swipe. |
| index | integer | `0` | all | This is the index of the slide to show. This is useful when you want to change the default slide shown. Or when you have tabs linked to each slide. |
| onChangeIndex | function(index, indexLatest) | | all | This is callback prop. It's call by the component when the shown slide change after a swipe made by the user. This is useful when you have tabs linked to each slide. |
| onSwitching | function(index, type) | | all | This is callback prop. It's called by the component when the slide switching. This is useful when you want to implement something corresponding to the current slide position. |
| onTransitionEnd | function | | all | The callback that fires when the animation comes to a rest. This is useful to defer CPU intensive task. |
| resistance | bool | `false` | all | If true, it will add bounds effect on the edges. |
| style | object | `{}` | all | This is the inlined style that will be applied on the root component. |
| slideStyle | object | `{}` | all | This is the inlined style that will be applied on the slide component. |
| springConfig | object | `{duration: '0.3s', easeFunction: '...', delay: '0s'}` | browser | This is the config used to create CSS transitions. This is useful to change the dynamic of the transition. |
| springConfig | object | `{tension: 300, friction: 30}` | native.animated | This is the config given to Animated for the `spring`. This is useful to change the dynamic of the transition. |
| threshold | integer | `5` | all | This is the threshold used for detecting a quick swipe. If the computed speed is above this value, the index change. |

Any other properties like `className` will be applied to the root component.

## `virtualize`

This HOC extends the properties of `<SwipeableViews />` and adds the following ones:

| Name | Type | Default | Platform | Description |
|:-----|:-----|:--------|:---------|:------------|
| overscanSlideAfter | integer | `2` | all | Number of slide to render after the visible slide. |
| overscanSlideBefore | integer | `3` | all | Number of slide to render before the visible slide. Separate from `overscanSlideAfter` as it's more difficult to keep the window up to date.|
| slideCount | integer | | all | When set, it's adding a limit to the number of slide: [0, slideCount]. |
| slideRenderer | func | | all | Responsible for rendering a slide given an index. ({ index: integer }): node |

## `autoPlay`

This HOC extends the properties of `<SwipeableViews />` and adds the following ones:

| Name | Type | Default | Platform | Description |
|:-----|:-----|:--------|:---------|:------------|
| autoplay | bool | `true` | all | If `false`, the auto play behavior is disabled. |
| direction | enum:<br>&nbsp;'incremental'<br>&nbsp;'decremental' | `'incremental'` | all | This is the auto play direction. |
| interval | integer | `3000` | all | Delay between auto play transitions (in ms). |

## `bindKeyboard`

This HOC exposes the same properties as `<SwipeableViews />`.
