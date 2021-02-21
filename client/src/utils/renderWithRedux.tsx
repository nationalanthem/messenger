import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { rootReducer } from '../redux/root-reducer'

const store = createStore(rootReducer)

export const renderWithRedux = (component: React.ReactNode) => {
  return render(<Provider store={store}>{component}</Provider>)
}
