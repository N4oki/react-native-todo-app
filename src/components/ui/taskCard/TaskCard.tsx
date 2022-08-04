import React, { useState } from 'react'
import * as Haptics from 'expo-haptics'
import { HStack, Input, useColorMode } from 'native-base'
import { TouchableOpacity, Dimensions } from 'react-native'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming
} from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

import CheckBox from './CheckBox'
import TrashIcon from './TrashIcon'
import { useGlobalContext } from '../../../context/GlobalStateProvider'
import { getSelectedColor } from '../../../utils/utils'

interface taskProps {
  id: string | number[]
  task: string
  isDone: boolean
  toggleItemState: (id: string | number[]) => void
  deleteItem: (id: string | number[]) => void
}

const SCREEN_WIDTH = Dimensions.get('window').width
const THRESHOLD = -SCREEN_WIDTH * 0.1
const LIST_ITEM_HIGHT = 40

const TaskCard = (props: taskProps) => {
  const { task, id, toggleItemState, deleteItem } = props
  const [isOver, setIsOver] = useState(false)
  const [checked, setChecked] = useState(false)
  const [taskValue, setTaskValue] = useState(task)

  const { state } = useGlobalContext()

  const progress = useSharedValue(0)
  const textTranslateX = useSharedValue(1)
  const opacity = useSharedValue(1)
  const translateX = useSharedValue(0)
  const itemHeight = useSharedValue(LIST_ITEM_HIGHT)
  const marginY = useSharedValue(10)

  const { colorMode } = useColorMode()

  const placeHolderColor =
    colorMode === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'

  const gesture = Gesture.Pan()
    .failOffsetY([-5, 5])
    .activeOffsetX([-5, 5])
    .onUpdate(event => {
      const isRightSwipe = event.translationX > -1
      if (isRightSwipe) return

      translateX.value = event.translationX

      const shouldBeIsOver = translateX.value < THRESHOLD && !isOver
      if (shouldBeIsOver) {
        setIsOver(true)
      }
    })
    .onEnd(() => {
      const shouldBeDismissed = translateX.value < THRESHOLD
      if (shouldBeDismissed && id) {
        translateX.value = withTiming(-SCREEN_WIDTH / 2)
        opacity.value = withTiming(0)
        marginY.value = withDelay(300, withTiming(0))
        itemHeight.value = withDelay(
          300,
          withTiming(0, undefined, isFinished => {
            if (isFinished) {
              runOnJS(deleteItem)(id)
            }
          })
        )
      } else {
        translateX.value = withSpring(0)
        setIsOver(false)
      }
    })

  const moveXStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }]
  }))

  const translateXStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: textTranslateX.value }]
  }))

  const AnimatedOpacity = useAnimatedStyle(() => ({
    opacity: opacity.value
  }))

  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginY.value,
      opacity: opacity.value
    }
  })

  const check = () => {
    if (!id) return

    setChecked(prev => {
      return !prev
    })
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

    progress.value = withDelay(
      500,
      withTiming(checked ? 1 : 0, { duration: 500 }, isFinished => {
        if (isFinished) {
          textTranslateX.value = withSequence(
            withTiming(checked ? 0 : -3),
            withSpring(0)
          )
          opacity.value = withDelay(
            500,
            withTiming(checked ? 1 : 0.7, { duration: 500 })
          )
        }
        runOnJS(toggleItemState)(id)
      })
    )
  }

  return (
    <Animated.View
      style={[
        {
          marginHorizontal: 20,
          height: LIST_ITEM_HIGHT
        },
        rTaskContainerStyle
      ]}
    >
      {isOver ? <TrashIcon /> : null}

      <GestureDetector gesture={gesture}>
        <Animated.View style={moveXStyle}>
          <HStack alignItems="center">
            <TouchableOpacity onPress={check}>
              <CheckBox
                isChecked={checked}
                boxFillColor={getSelectedColor(state)}
                strokeColor="#f2fcfe"
              />
            </TouchableOpacity>
            <Animated.View style={[AnimatedOpacity, translateXStyle]}>
              <Input
                fontSize={22}
                placeholder="type your task"
                placeholderTextColor={placeHolderColor}
                value={taskValue}
                width={SCREEN_WIDTH * 0.8}
                variant="unstyled"
                onChangeText={(text: string) => setTaskValue(text)}
                padding={1}
              />
            </Animated.View>
          </HStack>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  )
}

export default TaskCard
