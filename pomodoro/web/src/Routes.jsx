// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'
import TimerLayout from 'src/layouts/TimerLayout'

import { useAuth } from './auth'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Set wrap={ScaffoldLayout} title="ReinforcementModels" titleTo="reinforcementModels" buttonLabel="New ReinforcementModel" buttonTo="newReinforcementModel">
        <Route path="/reinforcement-models/new" page={ReinforcementModelNewReinforcementModelPage} name="newReinforcementModel" />
        <Route path="/reinforcement-models/{id:Int}/edit" page={ReinforcementModelEditReinforcementModelPage} name="editReinforcementModel" />
        <Route path="/reinforcement-models/{id:Int}" page={ReinforcementModelReinforcementModelPage} name="reinforcementModel" />
        <Route path="/reinforcement-models" page={ReinforcementModelReinforcementModelsPage} name="reinforcementModels" />
      </Set>
      <Set wrap={TimerLayout}>
        <Route path="/" page={DashPage} name="dash" />
      </Set>
      <Set wrap={ScaffoldLayout} title="Users" titleTo="users" buttonLabel="New User" buttonTo="newUser">
        <Route path="/users/new" page={UserNewUserPage} name="newUser" />
        <Route path="/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
        <Route path="/users/{id:Int}" page={UserUserPage} name="user" />
        <Route path="/users" page={UserUsersPage} name="users" />
      </Set>
      <Set wrap={ScaffoldLayout} title="Profiles" titleTo="profiles" buttonLabel="New Profile" buttonTo="newProfile">
        <Route path="/profiles/new" page={ProfileNewProfilePage} name="newProfile" />
        <Route path="/profiles/{id:Int}/edit" page={ProfileEditProfilePage} name="editProfile" />
        <Route path="/profiles/{id:Int}" page={ProfileProfilePage} name="profile" />
        <Route path="/profiles" page={ProfileProfilesPage} name="profiles" />
      </Set>
      <Set wrap={ScaffoldLayout} title="JournalEntries" titleTo="journalEntries" buttonLabel="New JournalEntry" buttonTo="newJournalEntry">
        <Route path="/journal-entries/new" page={JournalEntryNewJournalEntryPage} name="newJournalEntry" />
        <Route path="/journal-entries/{id:Int}/edit" page={JournalEntryEditJournalEntryPage} name="editJournalEntry" />
        <Route path="/journal-entries/{id:Int}" page={JournalEntryJournalEntryPage} name="journalEntry" />
        <Route path="/journal-entries" page={JournalEntryJournalEntriesPage} name="journalEntries" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
