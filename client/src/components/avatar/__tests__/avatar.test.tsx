import { screen } from '@testing-library/react'
import { renderWithRedux } from '../../../utils/renderWithRedux'
import Avatar from '../avatar'

it('should render the avatar with a single capital letter', () => {
  const name = 'example'

  renderWithRedux(<Avatar>{name}</Avatar>)

  expect(screen.getByText(name.charAt(0).toUpperCase())).toBeInTheDocument()
})
