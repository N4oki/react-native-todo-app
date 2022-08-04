import React from 'react'
import { Switch, useColorMode, HStack, Icon } from 'native-base'
import { Feather } from '@expo/vector-icons'

const themeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <HStack
      safeAreaBottom
      marginBottom={2}
      space={2}
      alignItems="flex-end"
      justifyContent="space-evenly"
      flex={1}
    >
      <Icon
        as={Feather}
        name="sunset"
        size="xl"
        _dark={{ color: 'blueGray.50' }}
        _light={{ color: 'blueGray.600' }}
      />
      <Switch
        isChecked={colorMode === 'light'}
        onToggle={toggleColorMode}
        offThumbColor="blueGray.50"
      ></Switch>
      <Icon
        as={Feather}
        name="sunrise"
        size="xl"
        _dark={{ color: 'blueGray.50' }}
        _light={{ color: 'blueGray.600' }}
      />
    </HStack>
  )
}

export default themeToggle
