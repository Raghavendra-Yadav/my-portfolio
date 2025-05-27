import { GetStaticPaths, GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import { sanityClient } from '@/sanity/lib/sanity';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import SlugNavbar from '@/components/SlugNavbar';

interface Post {
  title: string;
  body: any[];
  mainImage?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  publishedAt: string;
}

interface TocItem {
  text: string;
  id: string;
  level: number;
}

function estimateReadTime(text: string) {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.round(words / wordsPerMinute));
}

function extractToc(body: any[]): TocItem[] {
  return body
    .filter((block) => block._type === 'block' && block.style === 'h2')
    .map((block) => {
      const text = block.children.map((c: any) => c.text).join('');
      const id = text
        .toLowerCase()
        .replace(/[^\w]+/g, '-')
        .replace(/^-+|-+$/g, '');
      return { text, id, level: 2 };
    });
}

const components = {
  block: {
    h2: ({ children }: any) => {
      const id = children[0]
        .toLowerCase()
        .replace(/[^\w]+/g, '-')
        .replace(/^-+|-+$/g, '');
      return (
        <h2 id={id} className="mt-10 mb-4 text-2xl font-bold scroll-mt-24">
          {children}
        </h2>
      );
    },
    h3: ({ children }: any) => {
      const id = children[0]
        .toLowerCase()
        .replace(/[^\w]+/g, '-')
        .replace(/^-+|-+$/g, '');
      return (
        <h3 id={id} className="mt-8 mb-2 text-xl font-semibold scroll-mt-24">
          {children}
        </h3>
      );
    },
  },
};

const BlogPost = ({ post }: { post: Post }) => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setScroll(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!post || !post.body) {
    return (
      <SlugNavbar>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lg text-gray-500">
            Sorry, this blog post could not be found.
          </p>
        </div>
      </SlugNavbar>
    );
  }

  const toc = extractToc(post.body);
  const plainText = post.body
    .map((block: any) =>
      block._type === 'block'
        ? block.children.map((c: any) => c.text).join(' ')
        : ''
    )
    .join(' ');
  const readTime = estimateReadTime(plainText);

  return (
    <SlugNavbar>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white relative">
        {/* Move sticky ToC bar to far left */}
        {toc.length > 0 && (
          <div
            className="group fixed top-24 left-0 z-30 h-[60vh] hidden lg:flex items-start"
            style={{ width: '72px' }}
          >
            {/* Vertical Progress Bar */}
            <div
              className="relative h-full w-2 flex flex-col items-center bg-transparent"
              style={{ left: '32px' }}
            >
              <div
                className="absolute left-0 top-0 w-1 rounded bg-gray-300 dark:bg-gray-700"
                style={{ height: '100%' }}
              />
              <div
                className="absolute left-0 top-0 w-1 rounded bg-gradient-to-b from-purple-400 to-purple-600"
                style={{
                  height: `${scroll}%`,
                  minHeight: '4px',
                  maxHeight: '100%',
                }}
              />
              {/* ToC content, hidden by default, shown on hover */}
              <div
                className={`
          absolute left-6 top-0 w-64 pl-6 pr-4 py-4 text-left bg-transparent
          opacity-0 pointer-events-none transition-all duration-300
          group-hover:opacity-100 group-hover:pointer-events-auto
          flex flex-col
        `}
                style={{
                  minWidth: '220px',
                  maxWidth: '320px',
                }}
              >
                <div className="mb-2">
                  <div className="font-serif text-2xl leading-tight">
                    {post.title}
                  </div>
                  <div className="text-xs text-gray-500 mb-2">
                    {readTime} min read
                  </div>
                </div>
                <ul className="space-y-2 text-base text-gray-700 dark:text-gray-300">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="hover:text-purple-600 transition-colors block"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        {/* Center the main content */}
        <main className="flex justify-center">
          <article className="w-full max-w-2xl px-4 py-24">
            <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
            <div className="flex items-center gap-4 text-gray-500 text-sm mb-6">
              <span>
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString()
                  : ''}
              </span>
              <span>•</span>
              <span>{readTime} min read</span>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <PortableText value={post.body} components={components} />
            </div>
          </article>
        </main>
      </div>
    </SlugNavbar>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "blogPost" && slug.current == $slug][0]{
    title,
    body,
    mainImage{asset->{url}, alt},
    publishedAt
  }`;
  const post = await sanityClient.fetch(query, { slug: params?.slug });

  return {
    props: { post: post || null },
    notFound: !post,
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `*[_type == "blogPost" && defined(slug.current)][]{
    "slug": slug.current
  }`;
  const posts = await sanityClient.fetch(query);

  return {
    paths: posts.map((post: { slug: string }) => ({
      params: { slug: post.slug },
    })),
    fallback: 'blocking',
  };
};

export default BlogPost;
