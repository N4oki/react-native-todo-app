import React from 'react'
import { Box, HStack } from 'native-base'
import { StatusBar } from 'react-native'
import ProgressCircle from './ProgressCircle'

interface percentageProp {
  percentage: number
}

const NabBar = ({ percentage }: percentageProp) => {
  return (
    <HStack
      safeAreaTop
      p={4}
      bgColor="blueGray.600"
      roundedBottom="2xl"
      shadow="3"
      _dark={{ bgColor: 'blueGray.100' }}
    >
      <StatusBar barStyle="dark-content" />
      <Box flex={1} justifyContent="center" alignItems="flex-end">
        <ProgressCircle size={150} strokeWidth={20} percentage={percentage} />
      </Box>
    </HStack>
  )
}

export default NabBar
