import { Transition } from '@headlessui/react'

import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import { useTimerContext } from 'src/providers/contexts/TimerContext'

import SettingsModal from '../SettingsModal/SettingsModal'

const Navbar = ({ onJournalButtonClick }) => {
  const { isAuthenticated, logIn, logOut } = useAuth()

  const { isSettingsOpen, setIsSettingsOpen, isNavMenuOpen, setIsNavMenuOpen } =
    useTimerContext()

  return (
    <div>
      <nav className="mb-4 bg-red-50 text-red-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                className="h-8 w-8"
                src="https://upload.wikimedia.org/wikipedia/commons/6/6e/533-tomato.svg" //def change this
                alt="Workflow"
              />
              {/* TODO implement streak */}
              {/* {isAuthenticated && <p>streak</p>} */}
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden items-center space-x-4 md:block">
                <button
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  className="h-10 w-20 rounded-md p-2 transition-all duration-150 ease-in-out hover:bg-red-100"
                >
                  Settings
                </button>
                {isAuthenticated ? (
                  <>
                    <button
                      onClick={onJournalButtonClick}
                      className="h-10 w-20 rounded-md p-2 transition-all duration-150 ease-in-out hover:bg-red-100"
                    >
                      Journal
                    </button>
                    {/* TODO implement profile page */}
                    <Link to={routes.dash()}>
                      <button className="h-10 w-20 rounded-md p-2 transition-all duration-150 ease-in-out hover:bg-red-100">
                        Profile
                      </button>
                    </Link>
                    <button
                      onClick={logOut}
                      className="h-10 w-20 rounded-md p-2 transition-all duration-150 ease-in-out hover:bg-red-100"
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={logIn}
                    className="h-10 w-20 rounded-md p-2 transition-all duration-150 ease-in-out hover:bg-red-100"
                  >
                    Log In
                  </button>
                )}
              </div>
              {/* Mobile menu button */}
              <div className="-mr-2 flex md:hidden">
                <button
                  onClick={() => setIsNavMenuOpen(!isNavMenuOpen)}
                  type="button"
                  className="inline-flex items-center justify-center rounded-md bg-gray-900 p-2 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  {!isNavMenuOpen ? (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        <Transition
          show={isNavMenuOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <ul ref={ref} className="space-y-2 px-2 pb-3 pt-2 sm:px-3">
                <li>
                  <button onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
                    Settings
                  </button>
                </li>
                {isAuthenticated ? (
                  <>
                    <li>
                      <button onClick={onJournalButtonClick}>Journal</button>
                    </li>
                    <li>
                      <Link to={routes.dash()}>Profile</Link>
                    </li>
                    <li>
                      <button onClick={logOut}>Log Out</button>
                    </li>
                  </>
                ) : (
                  <li>
                    <button onClick={logIn}>Log In</button>
                  </li>
                )}
              </ul>
            </div>
          )}
        </Transition>
      </nav>
      <SettingsModal />
    </div>
  )
}

export default Navbar
