import { GetStaticProps } from 'next';
import Link from 'next/link';
import { sanityClient } from '@/sanity/lib/sanity';
import PageNavbar from '@/components/PageNavbar';

interface BookSummary {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
}

export const getStaticProps: GetStaticProps = async () => {
  const query = `*[_type == "bookSummary"] | order(publishedAt desc){
    _id, title, slug, publishedAt
  }`;
  const summaries = await sanityClient.fetch(query);
  return { props: { summaries } };
};

export default function BookSummariesPage({
  summaries,
}: {
  summaries: BookSummary[];
}) {
  return (
    <PageNavbar>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Book Summaries</h1>
        <ul className="space-y-4">
          {summaries.map((summary) => (
            <li key={summary._id}>
              <Link
                href={`/book-summaries/${summary.slug.current}`}
                className="text-lg text-purple-600 hover:underline"
              >
                {summary.title}
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(summary.publishedAt).toDateString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </PageNavbar>
  );
}
