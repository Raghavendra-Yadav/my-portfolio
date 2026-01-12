import { GetStaticProps } from 'next';
import Link from 'next/link';
import { sanityClient } from '@/sanity/lib/sanity';
import PageNavbar from '@/components/PageNavbar';
import { motion } from 'framer-motion';

interface BookSummary {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  coverImage?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
}

export const getStaticProps: GetStaticProps = async () => {
  const query = `*[_type == "bookSummary"] | order(publishedAt desc){
    _id, title, slug, publishedAt, coverImage{asset->{url}, alt}
  }`;
  const summaries = await sanityClient.fetch(query);
  return { props: { summaries } };
};

function BookSummariesLanding() {
  return (
    <section className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Top blurred background */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#a78bfa] to-[#818cf8] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>

      <motion.div
        className="max-w-2xl mx-auto text-center py-24 px-4 z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.h1
          className="text-5xl sm:text-6xl font-extrabold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-purple-400 dark:via-blue-400 dark:to-indigo-400 py-2"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Welcome to Book Summaries
        </motion.h1>
        <motion.hr
          className="mx-auto my-8 border-gray-300 dark:border-gray-700 shadow-lg"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{ transformOrigin: 'center' }}
        />
        <motion.p
          className="text-xl text-gray-700 dark:text-gray-200 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Explore key insights and takeaways from a variety of books.
          <br />
          Scroll down to see the latest summaries!
        </motion.p>
        <motion.a
          href="#latest-summaries"
          className="inline-block mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-lg transition-transform hover:scale-105"
        >
          See Latest Summaries
        </motion.a>
      </motion.div>

      {/* Bottom blurred background */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#a78bfa] to-[#818cf8] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>
    </section>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
};

const BookSummariesPage = ({ summaries }: { summaries: BookSummary[] }) => (
  <PageNavbar>
    <BookSummariesLanding />
    <div id="latest-summaries" className="py-16 px-4 max-w-5xl mx-auto">
      <motion.h2
        className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-purple-400 dark:via-blue-400 dark:to-indigo-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        Latest Book Summaries
      </motion.h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {summaries.map((summary, i) => (
          <motion.div
            key={summary._id}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden flex flex-col transition-transform hover:-translate-y-1 hover:shadow-2xl"
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            custom={i}
          >
            <div className="flex-1 flex flex-col p-6 items-center text-center">
              {summary.coverImage?.asset?.url && (
                <img
                  src={summary.coverImage.asset.url}
                  alt={summary.coverImage.alt || summary.title}
                  className="w-32 h-48 object-cover rounded-lg mb-4 shadow"
                  style={{ marginLeft: 'auto', marginRight: 'auto' }}
                />
              )}
              <Link
                href={`/book-summaries/${summary.slug.current}`}
                className="text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-300 transition-colors"
                style={{ textDecoration: 'none' }}
              >
                {summary.title}
              </Link>
              <div className="flex flex-col justify-between h-full w-full">
                <div style={{ height: '2.5rem' }} />{' '}
                {/* Spacer to align date */}
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 min-h-[1.25rem] flex items-center justify-center">
                  {new Date(summary.publishedAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
                <div className="mt-auto flex justify-center">
                  <Link
                    href={`/book-summaries/${summary.slug.current}`}
                    className="inline-block mt-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium shadow hover:scale-105 transition-transform"
                    style={{ textDecoration: 'none' }}
                  >
                    Read Summary
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </PageNavbar>
);

export default BookSummariesPage;
