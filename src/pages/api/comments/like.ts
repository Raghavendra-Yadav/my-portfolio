import type { NextApiRequest, NextApiResponse } from 'next';
import { sanityClient } from '@/sanity/lib/sanity';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { commentId, like } = req.body;

  try {
    // First get the current likes count
    const comment = await sanityClient.fetch(
      `*[_type == "comment" && _id == $commentId][0]`,
      { commentId }
    );

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Update the likes count
    const result = await sanityClient
      .patch(commentId)
      .set({ likes: (comment.likes || 0) + (like ? 1 : -1) })
      .commit();

    return res.status(200).json({ likes: result.likes });
  } catch (error) {
    console.error('Error updating likes:', error);
    return res.status(500).json({ message: 'Error updating likes' });
  }
}
