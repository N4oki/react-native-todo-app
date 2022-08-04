import React from 'react'
import { Text, VStack } from 'native-base'

import ThemeToggle from '../components/ui/Sidebar/ThemeToggle'
import ColorPallet from '../components/ui/Sidebar/ColorPallet'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'

const ExampleWithHoc = gestureHandlerRootHOC(() => (
  <VStack
    flex={1}
    px={4}
    _dark={{ bg: 'blueGray.600' }}
    _light={{ bg: 'blueGray.50' }}
  >
    <VStack safeArea space="sm">
      <Text fontWeight="bold" fontSize="3xl">
        TODO
      </Text>
      <ColorPallet />
    </VStack>
    <ThemeToggle />
  </VStack>
))

const SideBar = () => {
  return <ExampleWithHoc />
}

export default SideBar
