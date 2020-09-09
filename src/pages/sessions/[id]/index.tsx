import { NextPage } from 'next';
import React from 'react';
import TeamSession from 'components/team-session';
import { useRouter } from 'next/router';

const SessionPage: NextPage = () => {
  const router = useRouter();
  const teamId = parseInt(router.query.id as string);

  return <TeamSession team={teamId} />;
};

export default SessionPage;
