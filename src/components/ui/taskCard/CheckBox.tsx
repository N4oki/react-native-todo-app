import React, { useEffect } from 'react'
import Svg, { Path } from 'react-native-svg'
import Animated, {
  useAnimatedProps,
  interpolateColor,
  useSharedValue,
  withTiming,
  withDelay
} from 'react-native-reanimated'
import { BOX_OUTLINE } from '../../../data/constants'

const MARGIN = 10
const HEIGHT = 30 + MARGIN
const WIDTH = 30 + MARGIN

const STROKE_LENGTH = 33

const CHECKMARK_STROKE =
  'M7 14.1765C9.1 14.1765 13.2544 18.0709 13.8108 20C15.4 13.6471 21.7 5.17647 28 2'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedStroke = Animated.createAnimatedComponent(Path)

interface AnimatedStrokeProps {
  boxFillColor: string
  strokeColor: string
  isChecked: boolean
}

const CheckBox = ({
  boxFillColor,
  strokeColor,
  isChecked
}: AnimatedStrokeProps) => {
  const checkBoxProgress = useSharedValue(0)

  useEffect(() => {
    checkBoxProgress.value = withDelay(
      500,
      withTiming(isChecked ? 1 : 0, { duration: 500 })
    )
  }, [isChecked])

  const boxAnimatedProps = useAnimatedProps(() => ({
    fill: interpolateColor(
      checkBoxProgress.value,
      [0, 1],
      ['transparent', boxFillColor]
    )
  }))

  const strokeAnimatedProps = useAnimatedProps(() => ({
    strokeDashoffset: STROKE_LENGTH - STROKE_LENGTH * checkBoxProgress.value
  }))

  return (
    <Svg
      width={WIDTH}
      height={HEIGHT}
      viewBox={`${-MARGIN} ${-MARGIN} ${WIDTH + MARGIN} ${HEIGHT + MARGIN}`}
    >
      <AnimatedPath
        d={BOX_OUTLINE}
        stroke={boxFillColor}
        strokeWidth={2.5}
        animatedProps={boxAnimatedProps}
      />
      <AnimatedStroke
        d={CHECKMARK_STROKE}
        strokeDasharray={STROKE_LENGTH}
        stroke={strokeColor}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        animatedProps={strokeAnimatedProps}
      />
    </Svg>
  )
}

export default CheckBox
