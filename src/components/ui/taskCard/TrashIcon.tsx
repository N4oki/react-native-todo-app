import React from 'react'
import Animated, {
  FadeInRight,
  FadeOutRight,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'
import { Icon } from 'native-base'

const TrashIcon = () => {
  const opacity = useSharedValue(1)
  const AnimatedOpacity = useAnimatedStyle(() => ({
    opacity: opacity.value
  }))
  return (
    <Animated.View
      style={[
        {
          height: 40,
          width: 40,
          position: 'absolute',
          top: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center'
        },
        AnimatedOpacity
      ]}
      entering={FadeInRight.duration(500)}
      exiting={FadeOutRight}
      onLayout={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
    >
      <Icon
        as={MaterialCommunityIcons}
        name="delete-alert"
        size={22}
        _dark={{ color: 'blueGray.50' }}
        _light={{ color: 'blueGray.600' }}
      />
    </Animated.View>
  )
}

export default TrashIcon
