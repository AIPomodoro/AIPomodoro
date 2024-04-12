import { render } from '@redwoodjs/testing/web'

import PipeyResponse from './PipeyResponse'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PipeyResponse', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PipeyResponse />)
    }).not.toThrow()
  })
})
