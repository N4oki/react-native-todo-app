import React, { useRef } from 'react'
import AppContainer from './src/components/AppContainer'
import MainScreen from './src/screens/MainScreen'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout'
import SideBar from './src/screens/SideBar'
import { AntDesign } from '@expo/vector-icons'
import { Box, IconButton } from 'native-base'
import { Dimensions } from 'react-native'
import 'react-native-gesture-handler'

const WIDTH = Dimensions.get('window').width

export default function App() {
  const drawerRef = useRef<DrawerLayout>(null)
  return (
    <AppContainer>
      <DrawerLayout
        ref={drawerRef}
        drawerWidth={WIDTH * 0.7}
        edgeWidth={WIDTH * 0.3}
        drawerType="slide"
        renderNavigationView={SideBar}
      >
        <MainScreen />
        <Box position="absolute" safeAreaTop p={4}>
          <IconButton
            _icon={{
              as: AntDesign,
              name: 'menu-fold',
              color: 'blueGray.900',
              size: 'lg'
            }}
            onPress={() => drawerRef.current?.openDrawer()}
          />
        </Box>
      </DrawerLayout>
    </AppContainer>
  )
}
