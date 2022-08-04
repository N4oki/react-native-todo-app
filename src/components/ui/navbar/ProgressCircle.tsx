import React, { useEffect } from 'react'
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'

import Svg, { Circle } from 'react-native-svg'
import { Box } from 'native-base'
import AnimatedText from '../taskCard/AnimatedText'
import { getSelectedColor } from '../../../utils/utils'
import { useGlobalContext } from '../../../context/GlobalStateProvider'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

interface taskProps {
  size: number
  strokeWidth: number
  percentage: number
}

const ProgressContainer = (props: taskProps) => {
  const { size, strokeWidth, percentage } = props
  const { state } = useGlobalContext()

  const viewBox = `0 0 ${size} ${size}`
  const radius = (size - strokeWidth) / 2
  const circumference = radius * Math.PI * 2

  const circleProgress = useSharedValue(0)

  useEffect(() => {
    circleProgress.value = withTiming(percentage / 100, { duration: 1000 })
  }, [percentage])

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - circleProgress.value)
  }))

  const progressText = useDerivedValue(() => {
    return `${Math.floor(circleProgress.value * 100)}%`
  })

  return (
    <Svg width={size} height={size} viewBox={viewBox}>
      <Box height="full" justifyContent="center" alignItems="center">
        <AnimatedText text={progressText} />
      </Box>

      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="gray"
        strokeWidth={strokeWidth}
      />
      <AnimatedCircle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={12}
        stroke={getSelectedColor(state)}
        strokeDasharray={circumference}
        animatedProps={animatedProps}
        transform={`rotate (-90 ${size / 2} ${size / 2} )`}
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default ProgressContainer
