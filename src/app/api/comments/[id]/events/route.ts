import { NextResponse } from 'next/server';
import { sanityClient } from '@/sanity/lib/sanity';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  // Set up SSE headers
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      // Initial comment fetch
      const comment = await sanityClient.fetch(
        `*[_type == "comment" && _id == $id][0]`,
        { id }
      );

      if (comment) {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(comment)}\n\n`)
        );
      }

      // Set up a listener for changes
      const subscription = sanityClient
        .listen(`*[_type == "comment" && _id == $id]`, { id })
        .subscribe((update) => {
          if (update.transition === 'update') {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify(update.result)}\n\n`)
            );
          }
        });

      // Clean up subscription when the connection closes
      request.signal.addEventListener('abort', () => {
        subscription.unsubscribe();
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
