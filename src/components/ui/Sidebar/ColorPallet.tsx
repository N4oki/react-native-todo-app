import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { HStack } from 'native-base'
import CheckBox from '../taskCard/CheckBox'
import SideBarTitle from './SideBarTitle'

import {
  GlobalStateInterface,
  useGlobalContext
} from '../../../context/GlobalStateProvider'

const ColorPallet = () => {
  const { state, setState } = useGlobalContext()

  const setThemeColor = (data: Partial<GlobalStateInterface>) => {
    setState(prev => {
      const newData = [...prev]
      newData.map(item => {
        if (item.color === data.color) {
          item.isChecked = true
        } else {
          item.isChecked = false
        }
      })
      return newData
    })
  }

  {
  }
  return (
    <>
      <SideBarTitle title="Color" icon="format-color-fill" />
      <HStack flexWrap="wrap" width="full">
        {state.map(item => {
          return (
            <TouchableOpacity
              key={item.color}
              onPress={() => setThemeColor(item)}
            >
              <CheckBox
                isChecked={item.isChecked!}
                strokeColor="white"
                boxFillColor={item.color! || 'red'}
              />
            </TouchableOpacity>
          )
        })}
      </HStack>
    </>
  )
}

export default ColorPallet
