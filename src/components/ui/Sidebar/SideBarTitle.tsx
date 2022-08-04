import { HStack, Icon, Text } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'

interface sidebarItemProps {
  icon: string
  title: string
}

const SideBarTitle = (props: sidebarItemProps) => {
  const { icon, title } = props

  return (
    <HStack alignItems="center" ml="2" space="md">
      <Icon
        as={MaterialIcons}
        name={icon}
        size="xl"
        _dark={{ color: 'blueGray.50' }}
        _light={{ color: 'blueGray.600' }}
      />
      <Text fontSize="2xl" fontWeight="light">
        {title}
      </Text>
    </HStack>
  )
}

export default SideBarTitle
