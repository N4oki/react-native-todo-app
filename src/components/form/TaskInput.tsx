import React, { useCallback, useState } from 'react'
import { Box, useColorMode } from 'native-base'
import { TextInput, TouchableOpacity } from 'react-native'
import RadioBox from '../ui/Sidebar/RadioBox'
import { useGlobalContext } from '../../context/GlobalStateProvider'
import { getSelectedColor } from '../../utils/utils'

interface taskInputProp {
  handleSubmit: (taskValue: string) => void
}

const TaskInput = (prop: taskInputProp) => {
  const { handleSubmit } = prop
  const [taskValue, setTaskValue] = useState('')
  const { state } = useGlobalContext()
  const { colorMode } = useColorMode()

  const valid = taskValue.length >= 1

  const placeHolderColor =
    colorMode === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'
  const textColor = colorMode === 'dark' ? 'white' : 'black'

  const onPress = useCallback((taskValue: string) => {
    if (!taskValue) return

    setTimeout(() => {
      handleSubmit(taskValue)
      setTaskValue('')
    }, 500)
  }, [])

  return (
    <Box flexDirection="row" marginX={5} marginY={2.5}>
      <TouchableOpacity
        disabled={valid ? false : true}
        onPress={() => onPress(taskValue)}
      >
        <RadioBox strokeColor={getSelectedColor(state)} selected={valid} />
      </TouchableOpacity>
      <TextInput
        autoCorrect={false}
        placeholder="Type here to add task"
        placeholderTextColor={placeHolderColor}
        onChangeText={taskValue => setTaskValue(taskValue)}
        defaultValue={taskValue}
        style={{ fontSize: 22, padding: 1, color: textColor }}
        onSubmitEditing={() => onPress(taskValue)}
      />
    </Box>
  )
}

export default TaskInput
