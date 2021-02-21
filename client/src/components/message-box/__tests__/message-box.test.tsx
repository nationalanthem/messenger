import { screen } from '@testing-library/react'
import { renderWithRedux } from '../../../utils/renderWithRedux'
import MessageBox from '../message-box'

it('should render a tooltip when there are no messages', () => {
  renderWithRedux(<MessageBox messages={[]} />)

  expect(screen.getByText(/нет сообщений/i)).toBeInTheDocument()
})
