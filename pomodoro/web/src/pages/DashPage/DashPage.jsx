import React, { useState } from 'react';
import { Metadata } from '@redwoodjs/web';
import { useAuth } from 'src/auth';
import RatingModal from 'src/components/RatingModal/RatingModal';
import JournalModalCell from 'src/components/JournalModalCell/JournalModalCell';
import Timer from 'src/components/Timer/Timer';
import TimerCell from 'src/components/TimerCell/TimerCell';
import { useTimerContext } from 'src/layouts/TimerLayout';

const DashPage = () => {
  const { loading } = useAuth();
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const { isRatingOpen } = useTimerContext();

  if (loading) return <p>Loading...</p>;

  const toggleJournalModal = () => setIsJournalOpen(!isJournalOpen);

  return (
    <>
      <Metadata title="Dash" description="Dash page" />
      <div className="flex h-48 justify-center">
        <Timer />
      </div>
      {isRatingOpen && <RatingModal />}
    </>
  );
};

export default DashPage;
