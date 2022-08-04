import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import type { TextProps as RNTextProps } from 'react-native'
import Animated, { useAnimatedProps } from 'react-native-reanimated'

interface TextProps {
  text: Animated.SharedValue<string>
  style?: Animated.AnimateProps<RNTextProps>['style']
}
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

const AnimatedText = (props: TextProps) => {
  const { text, style } = props

  const animatedProps = useAnimatedProps(() => {
    return {
      text: text.value
    } as any
  })

  return (
    <AnimatedTextInput
      editable={false}
      value={text.value}
      style={[style, styles.defaultStyle]}
      {...{ animatedProps }}
    />
  )
}

export default AnimatedText

const styles = StyleSheet.create({
  defaultStyle: {
    color: 'black',
    fontSize: 22
  }
})
