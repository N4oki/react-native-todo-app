import * as React from 'react'
import { NativeBaseProvider } from 'native-base'
import theme from '../data/theme'
import { GlobalStateProvider } from '../context/GlobalStateProvider'
import { INITIAL_COLORS } from '../data/constants'

type Props = {
  children: React.ReactNode
}

const AppContainer = (props: Props) => {
  return (
    <NativeBaseProvider theme={theme}>
      <GlobalStateProvider value={INITIAL_COLORS}>
        {props.children}
      </GlobalStateProvider>
    </NativeBaseProvider>
  )
}

export default AppContainer
