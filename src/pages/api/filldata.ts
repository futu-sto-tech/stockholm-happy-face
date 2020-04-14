import { NextApiRequest, NextApiResponse } from 'next';
import { getGiphyGif, getGiphyId } from '../../lib/giphy';

import axios from 'axios';

interface RequestBody {
  table: {
    name: string;
  };
  event: {
    op: string;
    data: {
      new: {
        id: number;
        original_url: string;
      };
    };
  };
}

const HASURA_GRAPHQL_ENDPOINT = process.env.HASURA_GRAPHQL_ENDPOINT as string;
const HASURA_GRAPHQL_ADMIN_SECRET = process.env.HASURA_GRAPHQL_ADMIN_SECRET as string;

const UPDATE_IMAGE_MUTATION = /* GraphQL */ `
  mutation UpdateImage($id: Int!, $giphyId: String!, $previewUrl: String!) {
    update_image(
      where: { id: { _eq: $id } }
      _set: { giphy_id: $giphyId, preview_url: $previewUrl }
    ) {
      returning {
        id
        preview_url
      }
    }
  }
`;

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const body = req.body as RequestBody;
  const image = body.event.data.new;
  console.info(`Processing image: ${image.id} with URL: ${image.original_url}`);

  const giphyId = getGiphyId(image.original_url);
  if (giphyId) {
    console.info(`Detected image with giphy: ${giphyId}`);
    const giphyImage = await getGiphyGif(giphyId);

    if (giphyImage) {
      console.info(`Found related giphy image: ${giphyImage.title}`);
      const response = await axios.post(
        `https://${HASURA_GRAPHQL_ENDPOINT}`,
        {
          query: UPDATE_IMAGE_MUTATION,
          variables: {
            id: image.id,
            giphyId: giphyImage.id,
            previewUrl: giphyImage.preview.url,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-Hasura-Admin-Secret': HASURA_GRAPHQL_ADMIN_SECRET,
          },
        },
      );

      console.info(`Updated image with preview URL: ${response.data}`);
      return res.end(JSON.stringify({ success: true }));
    }
  }

  return res.end(JSON.stringify({ success: false }));
};
