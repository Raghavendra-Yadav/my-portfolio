import { NextResponse } from 'next/server';
import { sanityClient } from '@/sanity/lib/sanity';

interface SanityError extends Error {
  statusCode?: number;
  details?: string;
}

async function fetchComment(id: string, retries = 3): Promise<any> {
  for (let i = 0; i < retries; i++) {
    try {
      const comment = await sanityClient.fetch(
        `*[_type == "comment" && _id == $id][0]`,
        { id }
      );
      if (comment) return comment;
    } catch (error) {
      console.error(`Fetch attempt ${i + 1} failed:`, error);
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  return null;
}

async function updateComment(
  id: string,
  field: string,
  value: number,
  revision: string,
  retries = 3
): Promise<any> {
  for (let i = 0; i < retries; i++) {
    try {
      const updatedComment = await sanityClient
        .patch(id)
        .set({ [field]: value })
        .ifRevisionId(revision)
        .commit();

      if (updatedComment) return updatedComment;
    } catch (error) {
      console.error(`Update attempt ${i + 1} failed:`, error);
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  return null;
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { type, action } = await request.json();
    const id = (await params).id;

    console.log('Vote Request:', { id, type, action });

    if (!type || !action || !id) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!['like', 'upvote'].includes(type)) {
      return NextResponse.json({ error: 'Invalid vote type' }, { status: 400 });
    }

    if (!['add', 'remove'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    // Get the current comment with retries
    const comment = await fetchComment(id);
    if (!comment) {
      console.error('Comment not found after retries:', id);
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    console.log('Current Comment:', comment);

    // Update the comment with the new vote count
    const field = type === 'like' ? 'likes' : 'upvotes';

    // Ensure the field exists and is a number
    if (typeof comment[field] !== 'number') {
      console.log('Initializing vote field:', { field, commentId: id });
      try {
        // Initialize the field if it doesn't exist
        const initializedComment = await updateComment(
          id,
          field,
          0,
          comment._rev
        );
        if (!initializedComment) {
          throw new Error('Failed to initialize vote field');
        }
        comment[field] = 0;
        comment._rev = initializedComment._rev;
      } catch (error) {
        console.error('Failed to initialize vote field:', error);
        throw error;
      }
    }

    const currentCount = comment[field] || 0;

    // Calculate the new count based on the action
    let newCount;
    if (action === 'add') {
      newCount = currentCount + 1;
    } else {
      // For remove action, ensure we don't go below 0
      newCount = Math.max(0, currentCount - 1);
    }

    console.log('Vote Count Update:', {
      field,
      currentCount,
      newCount,
      action,
      revision: comment._rev,
    });

    try {
      // Update the comment in Sanity with optimistic locking using _rev
      const updatedComment = await updateComment(
        id,
        field,
        newCount,
        comment._rev
      );
      if (!updatedComment) {
        throw new Error('Failed to update comment');
      }

      console.log('Updated Comment:', updatedComment);
      return NextResponse.json(updatedComment);
    } catch (error) {
      const sanityError = error as SanityError;
      console.error('Sanity update error:', {
        error,
        statusCode: sanityError.statusCode,
        details: sanityError.details,
      });

      // If there's a conflict, fetch the latest version and try again
      if (sanityError.statusCode === 409) {
        console.log('Conflict detected, fetching latest version...');
        const latestComment = await fetchComment(id);

        if (!latestComment) {
          throw new Error('Failed to fetch latest comment version');
        }

        // Ensure the field exists in the latest version
        if (typeof latestComment[field] !== 'number') {
          latestComment[field] = 0;
        }

        // Recalculate the count based on the latest version
        const latestCount = latestComment[field] || 0;
        const retryCount =
          action === 'add' ? latestCount + 1 : Math.max(0, latestCount - 1);

        const retryComment = await updateComment(
          id,
          field,
          retryCount,
          latestComment._rev
        );
        if (!retryComment) {
          throw new Error('Failed to update comment on retry');
        }

        console.log('Retry Updated Comment:', retryComment);
        return NextResponse.json(retryComment);
      }

      throw error;
    }
  } catch (error) {
    console.error('Error voting on comment:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
