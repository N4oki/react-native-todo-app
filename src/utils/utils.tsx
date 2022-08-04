import { GlobalStateInterface } from '../context/GlobalStateProvider'

export const getSelectedColor = (
  data: Partial<GlobalStateInterface>[]
): string => {
  const color = data.find(item => item.isChecked)?.color
  if (color) {
    return color
  }
  return '#1c92d2'
}
