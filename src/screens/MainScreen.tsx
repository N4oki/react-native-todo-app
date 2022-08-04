import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { LayoutAnimation, Platform, UIManager } from 'react-native'
import uuid from 'react-native-uuid'
import { Center, KeyboardAvoidingView } from 'native-base'
import { FlatList } from 'react-native-gesture-handler'

import NabBar from '../components/ui/navbar/NavBar'
import TaskCard from '../components/ui/taskCard/TaskCard'
import TaskInput from '../components/form/TaskInput'

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}

const MainScreen = () => {
  const [percentage, setPercentage] = useState(0)
  const [data, setData] = useState([
    {
      id: uuid.v4(),
      task: 'Edit video',
      isDone: false
    }
  ])

  const handleSubmit = useCallback((taskValue: string) => {
    if (!taskValue) return
    LayoutAnimation.configureNext({
      duration: 500,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity
      },
      update: { type: LayoutAnimation.Types.linear }
    })
    setData(prev => {
      const newData = [
        {
          id: uuid.v4(),
          task: taskValue,
          isDone: false
        },
        ...prev
      ]
      return newData
    })
  }, [])

  const toggleItemState = useCallback((id: string | number[]) => {
    LayoutAnimation.configureNext({
      duration: 500,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity
      },
      update: { type: LayoutAnimation.Types.linear }
    })
    setData(prevData => {
      const newData = [...prevData]
      newData.map(item => {
        if (item.id === id) {
          item.isDone = !item.isDone
        }
      })

      const doneArray = newData.filter(x => x.isDone === true)
      const unDoneArray = newData.filter(x => x.isDone === false)
      const newArray = unDoneArray.concat(doneArray)
      return newArray
    })
  }, [])

  const deleteItem = useCallback((id: string | number[]) => {
    setData(prevData => {
      const newData = prevData.filter(item => item.id !== id)
      return newData
    })
  }, [])

  useEffect(() => {
    setPercentage(getPercentage)
  }, [data])

  const getPercentage = useMemo(() => {
    const checkedTasks = data.filter(task => {
      if (task.isDone) return true
      return false
    }).length

    const totalTasks = data.length
    const percentage = (checkedTasks / totalTasks) * 100

    return percentage || 0
  }, [data])

  return (
    <Center
      _dark={{ bg: 'blueGray.600' }}
      _light={{ bg: 'blueGray.100' }}
      flex={1}
    >
      <NabBar percentage={percentage} />
      <KeyboardAvoidingView
        style={{ flex: 1, width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TaskInput handleSubmit={handleSubmit} />
        <FlatList
          data={data}
          renderItem={({ item }) => {
            return (
              <TaskCard
                task={item.task}
                id={item.id}
                isDone={item.isDone}
                toggleItemState={toggleItemState}
                deleteItem={deleteItem}
              />
            )
          }}
        />
      </KeyboardAvoidingView>
    </Center>
  )
}

export default MainScreen
