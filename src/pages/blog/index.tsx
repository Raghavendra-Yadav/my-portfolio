import { GetStaticProps } from 'next';
import Link from 'next/link';
import { sanityClient } from '@/sanity/lib/sanity';
import PageNavbar from '@/components/PageNavbar';
import { motion } from 'framer-motion';
import Image from 'next/image';
import AnimatedBackground from '@/components/AnimatedBackground';

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  mainImage?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
}

export const getStaticProps: GetStaticProps = async () => {
  const query = `*[_type == "blogPost"] | order(publishedAt desc){
    _id, title, slug, publishedAt, mainImage{asset->{url}, alt}
  }`;
  const posts = await sanityClient.fetch(query);
  return {
    props: { posts },
    revalidate: 60, // Revalidate every 60 seconds
  };
};

function BlogLanding() {
  return (
    <section className="relative flex items-center justify-center min-h-screen bg-white dark:bg-black overflow-hidden">
      <AnimatedBackground theme="pink" />

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
          Welcome to the Blog
        </motion.h1>
        <motion.hr
          className="mx-auto my-8  border-gray-300 dark:border-gray-700 shadow-lg"
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
          Explore articles on web development, technology, and more.
          <br />
          Scroll down to see the latest posts!
        </motion.p>
        <motion.a
          href="#latest-posts"
          className="inline-block mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-lg transition-transform hover:scale-105"
        >
          See Latest Posts
        </motion.a>
      </motion.div>


    </section>
  );
}

const cardVariants: any = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
};

const BlogPage = ({ posts }: { posts: BlogPost[] }) => (
  <PageNavbar>
    <BlogLanding />
    <div id="latest-posts" className="py-16 px-4 max-w-5xl mx-auto">
      <motion.h2
        className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-purple-400 dark:via-blue-400 dark:to-indigo-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        Latest Blog Posts
      </motion.h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <motion.div
            key={post._id}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden flex flex-col transition-transform hover:-translate-y-1 hover:shadow-2xl"
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            custom={i}
          >
            {post.mainImage?.asset?.url && (
              <Link href={`/blog/${post.slug.current}`}>
                <Image
                  src={post.mainImage.asset.url}
                  alt={post.mainImage.alt || post.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                />
              </Link>
            )}
            <div className="flex-1 flex flex-col p-6 items-center text-center">
              <Link
                href={`/blog/${post.slug.current}`}
                className="text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-300 transition-colors"
                style={{ textDecoration: 'none' }}
              >
                {post.title}
              </Link>
              <div className="flex flex-col justify-between h-full w-full">
                <div style={{ height: '2.5rem' }} />{' '}
                {/* Spacer to align date */}
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 min-h-[1.25rem] flex items-center justify-center">
                  {new Date(post.publishedAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
                <div className="mt-auto flex justify-center">
                  <Link
                    href={`/blog/${post.slug.current}`}
                    className="inline-block mt-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium shadow hover:scale-105 transition-transform"
                    style={{ textDecoration: 'none' }}
                  >
                    Read More
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

export default BlogPage;
