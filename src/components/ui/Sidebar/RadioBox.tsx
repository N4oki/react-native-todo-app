import React, { useEffect } from 'react'
import Svg, { Path } from 'react-native-svg'
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
  interpolateColor
} from 'react-native-reanimated'
import { BOX_OUTLINE } from '../../../data/constants'
import { useColorMode } from 'native-base'

const MARGIN = 10
const HEIGHT = 30
const WIDTH = 30

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedSvg = Animated.createAnimatedComponent(Svg)

interface AnimatedStrokeProps {
  strokeColor: string
  selected: boolean
}

const RadioBox = ({ strokeColor, selected }: AnimatedStrokeProps) => {
  const { colorMode } = useColorMode()

  const progress = useSharedValue(0)

  const boxAnimatedProps = useAnimatedProps(() => ({
    stroke: interpolateColor(
      progress.value,
      [0, 1],
      [colorMode === 'dark' ? 'white' : 'black', strokeColor]
    )
  }))

  useEffect(() => {
    progress.value = withTiming(selected ? 1 : 0, { duration: 300 })
  }, [selected])

  return (
    <AnimatedSvg
      width={WIDTH + MARGIN}
      height={HEIGHT + MARGIN}
      viewBox={`${-MARGIN} ${-MARGIN} ${WIDTH + MARGIN * 2} ${
        HEIGHT + MARGIN * 2
      }`}
    >
      <AnimatedPath
        d={BOX_OUTLINE}
        strokeWidth={2.5}
        animatedProps={boxAnimatedProps}
      />
    </AnimatedSvg>
  )
}

export default RadioBox
