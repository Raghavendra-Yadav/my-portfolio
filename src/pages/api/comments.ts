import type { NextApiRequest, NextApiResponse } from 'next';
import { sanityClient } from '@/sanity/lib/sanity';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { name, email, comment, postId } = req.body;
    if (!name || !email || !comment || !postId) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }
    try {
      await sanityClient.create({
        _type: 'comment',
        name,
        email,
        comment,
        post: { _type: 'reference', _ref: postId },
        approved: false,
        createdAt: new Date().toISOString(),
      });
      return res.status(201).json({ message: 'Comment submitted for review.' });
    } catch (err) {
      return res.status(500).json({ message: 'Error submitting comment.' });
    }
  } else if (req.method === 'GET') {
    const { postId } = req.query;
    if (!postId) {
      return res.status(400).json({ message: 'Missing postId.' });
    }
    try {
      const comments = await sanityClient.fetch(
        `*[_type == "comment" && post._ref == $postId && approved == true]|order(createdAt desc)`,
        { postId }
      );
      return res.status(200).json(comments);
    } catch (err) {
      return res.status(500).json({ message: 'Error fetching comments.' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
