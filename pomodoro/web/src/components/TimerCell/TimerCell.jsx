import { useMutation, useQuery } from '@redwoodjs/web';
import gql from 'graphql-tag';

export const QUERY = gql`
  query GetTimerSettings($id: Int!) {
    profile(id: $id) {
      id
      workDuration
      breakDuration
      soundEnabled
      autoStart
    }
  }
`;

export const UPDATE_SETTINGS_MUTATION = gql`
  mutation UpdateTimerSettingsMutation($id: Int!, $input: UpdateProfileInput!) {
    updateProfile(id: $id, input: $input) {
      id
      workDuration
      breakDuration
      soundEnabled
      autoStart
    }
  }
`;

export const beforeQuery = (props) => {
  return { variables: props, fetchPolicy: 'cache-and-network' };
};

export const Loading = () => <div>Loading...</div>;
export const Empty = () => <div>Your timer settings are empty</div>;
export const Failure = ({ error }) => <div>Error: {error.message}</div>;

export const Success = ({ currentUser }) => {
  const [updateSettings] = useMutation(UPDATE_SETTINGS_MUTATION);

  const handleUpdateSettings = async (newSettings) => {
    await updateSettings({
      variables: { id: currentUser.profile.id, input: newSettings },
    });
  };

  return <Timer settings={currentUser.profile} onUpdateSettings={handleUpdateSettings} />;
};
