import { render } from '@redwoodjs/testing/web'

import SettingsModal from './SettingsModal'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SettingsModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SettingsModal />)
    }).not.toThrow()
  })
})
