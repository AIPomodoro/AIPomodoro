import { render } from '@redwoodjs/testing/web'

import JournalModal from './JournalModal'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('JournalModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<JournalModal />)
    }).not.toThrow()
  })
})
