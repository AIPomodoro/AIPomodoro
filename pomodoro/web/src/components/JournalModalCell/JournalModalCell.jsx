import React from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import JournalModal from 'src/components/JournalModal/JournalModal';

const CREATE_JOURNAL_ENTRY_MUTATION = gql`
  mutation CreateJournalEntryMutation($input: CreateJournalEntryInput!) {
    createJournalEntry(input: $input) {
      id
    }
  }
`;

const JournalModalCell = ({ onClose }) => {
  const [createJournalEntry] = useMutation(CREATE_JOURNAL_ENTRY_MUTATION);

  const handleEntrySubmit = async (entry) => {
    await createJournalEntry({ variables: { input: entry } });
    onClose();
  };

  return <JournalModal onClose={onClose} onSubmit={handleEntrySubmit} />;
};

export default JournalModalCell;
