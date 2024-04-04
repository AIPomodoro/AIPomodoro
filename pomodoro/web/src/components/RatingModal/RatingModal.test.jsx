import { render } from '@redwoodjs/testing/web'

import RatingModal from './RatingModal'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('RatingModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RatingModal />)
    }).not.toThrow()
  })
})
