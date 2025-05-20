import { GetStaticPaths, GetStaticProps } from 'next';
import { sanityClient } from '@/sanity/lib/sanity';
import { PortableText } from '@portabletext/react';
import SlugNavbar from '@/components/SlugNavbar';

interface Summary {
  title: string;
  summary: any;
  author: string;
  publishedAt: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `*[_type == "bookSummary"]{ slug }`;
  const summaries = await sanityClient.fetch(query);

  const paths = summaries.map((summary: any) => ({
    params: { slug: summary.slug.current },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "bookSummary" && slug.current == $slug][0]{
    title,
    summary,
    author,
    publishedAt
  }`;
  const summary = await sanityClient.fetch(query, { slug: params?.slug });

  return { props: { summary } };
};

const SummaryPage = ({ summary }: { summary: Summary }) => {
  const formattedDate = new Date(summary.publishedAt).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  return (
    <SlugNavbar>
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{summary.title}</h1>
        <p className="text-gray-600 mb-4">
          By {summary.author} • {formattedDate}
        </p>
        <PortableText value={summary.summary} />
      </div>
    </SlugNavbar>
  );
};

export default SummaryPage;
