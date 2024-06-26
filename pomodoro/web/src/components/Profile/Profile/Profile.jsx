import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import { checkboxInputTag, timeTag } from 'src/lib/formatters'

const DELETE_PROFILE_MUTATION = gql`
  mutation DeleteProfileMutation($id: Int!) {
    deleteProfile(id: $id) {
      id
    }
  }
`

const Profile = ({ profile }) => {
  const [deleteProfile] = useMutation(DELETE_PROFILE_MUTATION, {
    onCompleted: () => {
      toast.success('Profile deleted')
      navigate(routes.profiles())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete profile ' + id + '?')) {
      deleteProfile({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Profile {profile.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{profile.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(profile.createdAt)}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{profile.userId}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{profile.email}</td>
            </tr>
            <tr>
              <th>First name</th>
              <td>{profile.firstName}</td>
            </tr>
            <tr>
              <th>Last name</th>
              <td>{profile.lastName}</td>
            </tr>
            <tr>
              <th>Phone</th>
              <td>{profile.phone}</td>
            </tr>
            <tr>
              <th>Last login</th>
              <td>{timeTag(profile.lastLogin)}</td>
            </tr>
            <tr>
              <th>Last day</th>
              <td>{timeTag(profile.lastDay)}</td>
            </tr>
            <tr>
              <th>Current streak</th>
              <td>{profile.currentStreak}</td>
            </tr>
            <tr>
              <th>Sound enabled</th>
              <td>{checkboxInputTag(profile.soundEnabled)}</td>
            </tr>
            <tr>
              <th>Auto start</th>
              <td>{checkboxInputTag(profile.autoStart)}</td>
            </tr>
            <tr>
              <th>Auto adjust</th>
              <td>{checkboxInputTag(profile.autoAdjust)}</td>
            </tr>
            <tr>
              <th>Work duration</th>
              <td>{profile.workDuration}</td>
            </tr>
            <tr>
              <th>Break duration</th>
              <td>{profile.breakDuration}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editProfile({ id: profile.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(profile.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Profile
