import * as screenHook from '../screen-hooks';

import { useDebounce, useGifQuery } from '../../../hooks';

import ErrorBox from '../../../component/error-box';
import GifImageListEmpty from './gif-image-list-empty';
import GifImageListSuccess from './gif-image-list-success';
import React from 'react';

const GifImageList: React.FC<{ userId: string; offset: number }> = ({ userId, offset }) => {
  const query = useGifQuery();
  const debouncedQuery = useDebounce<string>(query, 1000);
  const { data, error } = screenHook.useGifImageList(userId, debouncedQuery, offset);

  if (error) {
    return <ErrorBox>{`The GIF search failed: ${error}`}</ErrorBox>;
  }

  if (data === undefined && !debouncedQuery) {
    return <GifImageListEmpty />;
  }

  if (data?.length === 0) {
    return <ErrorBox>No results found, try searching for something else</ErrorBox>;
  }

  return <GifImageListSuccess data={data} />;
};

export default GifImageList;
