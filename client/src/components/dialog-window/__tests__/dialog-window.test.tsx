import { screen } from '@testing-library/react'
import { renderWithRedux } from '../../../utils/renderWithRedux'
import DialogWindow from '../dialog-window'

describe('dialog window', () => {
  it('should render in idle state', () => {
    renderWithRedux(<DialogWindow />)

    expect(screen.getByText(/выберите диалог/i)).toBeInTheDocument()
  })
})
