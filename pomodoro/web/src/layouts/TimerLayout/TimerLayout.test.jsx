import { render } from '@redwoodjs/testing/web'

import TimerLayout from './TimerLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('TimerLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TimerLayout />)
    }).not.toThrow()
  })
})
