import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState
} from 'react'

export interface GlobalStateInterface {
  color: string
  isChecked: boolean
}

const GlobalStateContext = createContext({
  state: {} as Partial<GlobalStateInterface>[],
  setState: {} as Dispatch<SetStateAction<Partial<GlobalStateInterface>[]>>
})

const GlobalStateProvider = ({
  children,
  value = {} as GlobalStateInterface[]
}: {
  children: React.ReactNode
  value?: Partial<GlobalStateInterface>[]
}) => {
  const [state, setState] = useState(value)

  return (
    <GlobalStateContext.Provider value={{ state, setState }}>
      {children}
    </GlobalStateContext.Provider>
  )
}

const useGlobalContext = () => {
  const context = useContext(GlobalStateContext)
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateContext')
  }
  return context
}

export { GlobalStateProvider, useGlobalContext }
