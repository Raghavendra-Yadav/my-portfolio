import { NextResponse } from 'next/server';
import { sanityClient } from '@/sanity/lib/sanity';

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { type, action } = await request.json();
        const id = (await params).id;

        if (!type || !action || !id) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        if (!['like', 'upvote'].includes(type)) {
            return NextResponse.json({ error: 'Invalid vote type' }, { status: 400 });
        }

        if (!['add', 'remove'].includes(action)) {
            return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        }

        const field = type === 'like' ? 'likes' : 'upvotes';

        // Atomic increment/decrement
        const patchResult = await sanityClient
            .patch(id)
            .setIfMissing({ [field]: 0 })
            .inc({ [field]: action === 'add' ? 1 : -1 })
            .commit();

        // Prevent negative numbers (just in case)
        if (patchResult[field] < 0) {
            await sanityClient.patch(id).set({ [field]: 0 }).commit();
        }

        return NextResponse.json(patchResult);
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
