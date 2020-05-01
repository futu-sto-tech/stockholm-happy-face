import React, { useCallback, useEffect, useState } from 'react';
import { useInsertEntryWithImage, useInsertEntryWithUrl } from '../mutations/insert-entry';

import Link from 'next/link';
import { MdArrowBack } from 'react-icons/md';
import { useManualQuery } from 'graphql-hooks';
import { useRouter } from 'next/router';
import useTeamsQuery from '../queries/teams';
import useUserEntriesQuery from '../queries/user-entries';
import useUserQuery from '../queries/user';

const IMAGE_QUERY = /* GraphQL */ `
  query Image($url: String!) {
    image(where: { original_url: { _eq: $url } }, limit: 1) {
      id
    }
  }
`;

interface ImageQueryData {
  image: Array<{ id: number }>;
}

interface ImageQueryVariables {
  url: string;
}

const ConfirmNewEntry: React.FC<{ url: string; user: string }> = ({ url, user }) => {
  const router = useRouter();
  const [team, setTeam] = useState<number>();

  const { data: userData } = useUserQuery(user);
  const { data: teamsData } = useTeamsQuery();
  useEffect(() => {
    if (team === undefined) {
      setTeam(userData?.user_by_pk.team?.id || teamsData?.team[0].id);
    }
  }, [team, userData, teamsData]);

  const [fetchImage] = useManualQuery<ImageQueryData | undefined, ImageQueryVariables>(IMAGE_QUERY);

  const [insertEntryWithUrl, { data: dataWithUrl }] = useInsertEntryWithUrl();
  const [insertEntryWithImage, { data: dataWithImage }] = useInsertEntryWithImage();

  const { refetch } = useUserEntriesQuery(user);
  useEffect(() => {
    async function routeToProfile(): Promise<void> {
      await refetch();
      router.push('/profile');
    }

    const entryId =
      dataWithUrl?.insert_entry.returning[0].id || dataWithImage?.insert_entry.returning[0].id;
    if (entryId) {
      routeToProfile();
    }
  }, [dataWithUrl, dataWithImage, router, refetch]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent): Promise<void> => {
      event.preventDefault();

      if (team) {
        const data = await fetchImage({ variables: { url } });
        if (data.data?.image.length === 1) {
          await insertEntryWithImage({
            variables: { image: data.data.image[0].id, team, user },
          });
        } else {
          await insertEntryWithUrl({ variables: { team, user, url } });
        }
      }
    },
    [insertEntryWithImage, insertEntryWithUrl, team, user, url, fetchImage],
  );

  return (
    <div className="p-6 space-y-10 bg-white border border-black rounded-sm">
      <header className="space-y-6">
        <div>
          <p className="text-lg font-semibold text-center">Select this one?</p>
          <p className="text-center text-gray-700">
            Pick this GIF to share with your team during this weeks Smiley-session
          </p>
        </div>
        <div className="w-40 mx-auto">
          <div className="h-px bg-gray-600" />
          <div className="h-px bg-gray-600" />
        </div>
      </header>
      <main>
        <img className="mx-auto" src={url} />
      </main>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center space-x-4">
          <Link href="/entries/new">
            <a className="flex items-center px-6 py-2 space-x-2 text-gray-700 transition-colors duration-150 bg-white border border-gray-400 rounded hover:text-black hover:border-black">
              <MdArrowBack size="20" />
              <p className="text-base leading-none">Back</p>
            </a>
          </Link>

          <div className="flex">
            <select
              className="border-r-0 border-black rounded-l rounded-r-none form-select"
              value={team}
              onChange={({ target: { value } }): void => setTeam(parseInt(value))}
              required
            >
              <option disabled>Select team</option>
              {teamsData?.team.map((item) => (
                <option key={item.id} value={item.id}>
                  Post to {item.name}
                </option>
              ))}
            </select>
            <button
              className="px-6 py-2 text-white transition-colors duration-150 bg-black border border-black rounded-r hover:bg-white hover:text-black"
              type="submit"
            >
              Pick GIF
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ConfirmNewEntry;
