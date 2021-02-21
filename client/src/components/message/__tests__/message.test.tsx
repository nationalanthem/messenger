import { renderWithRedux } from '../../../utils/renderWithRedux'
import { screen } from '@testing-library/react'
import Message, { MessageProps } from '../message'
import { formatDate } from '../../../utils/formatDate'

it('should render the message according to props', () => {
  const props: MessageProps = {
    text: 'exampleText',
    timestamp: Date.now().toString(),
    type: 'to',
  }

  renderWithRedux(<Message {...props} />)

  expect(screen.getByText(props.text)).toBeInTheDocument()
  expect(screen.getByText(formatDate(props.timestamp))).toBeInTheDocument()
})
