import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Profile/ProfilesCell'
import { checkboxInputTag, timeTag, truncate } from 'src/lib/formatters'

const DELETE_PROFILE_MUTATION = gql`
  mutation DeleteProfileMutation($id: Int!) {
    deleteProfile(id: $id) {
      id
    }
  }
`

const ProfilesList = ({ profiles }) => {
  const [deleteProfile] = useMutation(DELETE_PROFILE_MUTATION, {
    onCompleted: () => {
      toast.success('Profile deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete profile ' + id + '?')) {
      deleteProfile({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Created at</th>
            <th>User id</th>
            <th>Email</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Phone</th>
            <th>Last login</th>
            <th>Last day</th>
            <th>Current streak</th>
            <th>Sound enabled</th>
            <th>Auto start</th>
            <th>Auto adjust</th>
            <th>Work duration</th>
            <th>Break duration</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile) => (
            <tr key={profile.id}>
              <td>{truncate(profile.id)}</td>
              <td>{timeTag(profile.createdAt)}</td>
              <td>{truncate(profile.userId)}</td>
              <td>{truncate(profile.email)}</td>
              <td>{truncate(profile.firstName)}</td>
              <td>{truncate(profile.lastName)}</td>
              <td>{truncate(profile.phone)}</td>
              <td>{timeTag(profile.lastLogin)}</td>
              <td>{timeTag(profile.lastDay)}</td>
              <td>{truncate(profile.currentStreak)}</td>
              <td>{checkboxInputTag(profile.soundEnabled)}</td>
              <td>{checkboxInputTag(profile.autoStart)}</td>
              <td>{checkboxInputTag(profile.autoAdjust)}</td>
              <td>{truncate(profile.workDuration)}</td>
              <td>{truncate(profile.breakDuration)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.profile({ id: profile.id })}
                    title={'Show profile ' + profile.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editProfile({ id: profile.id })}
                    title={'Edit profile ' + profile.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete profile ' + profile.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(profile.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProfilesList
