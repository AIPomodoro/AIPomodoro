import { render } from '@redwoodjs/testing/web'

import DashPage from './DashPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('DashPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DashPage />)
    }).not.toThrow()
  })
})
