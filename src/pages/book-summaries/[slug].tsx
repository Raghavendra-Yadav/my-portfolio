import { GetStaticPaths, GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import { sanityClient } from '@/sanity/lib/sanity';
import { PortableText } from '@portabletext/react';
import SlugNavbar from '@/components/SlugNavbar';
import Image from 'next/image';
import CommentSection from '@/components/CommentSection';
import Footer from '@/components/Footer';

interface Summary {
  title: string;
  summary: any[];
  author: string;
  publishedAt: string;
  _id?: string;
  slug?: { current: string; };
  coverImage?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
}

interface TocItem {
  text: string;
  id: string;
  level: number;
}

function extractToc(blocks: any[]): TocItem[] {
  return (blocks || [])
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
    publishedAt,
    _id,
    slug,
    coverImage{asset->{url}, alt}
  }`;
  const summary = await sanityClient.fetch(query, { slug: params?.slug });

  return { props: { summary } };
};

const SummaryPage = ({ summary }: { summary: Summary }) => {
  const [scroll, setScroll] = useState(0);
  const toc = extractToc(summary.summary);

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
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white relative">
        {/* TOC like blog */}
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
                    {summary.title}
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
        <main className="flex justify-center">
          <div className="w-full max-w-2xl px-4">
            <article className="py-24">
              {summary.coverImage?.asset?.url && (
                <div className="flex justify-center mb-8">
                  <Image
                    src={summary.coverImage.asset.url}
                    alt={summary.coverImage.alt || summary.title}
                    width={160}
                    height={240}
                    className="w-40 h-60 object-cover rounded-xl shadow-lg"
                  />
                </div>
              )}
              <h1 className="text-4xl font-bold mb-2">{summary.title}</h1>
              <div className="flex items-center gap-4 text-gray-500 text-sm mb-6">
                <span>By {summary.author}</span>
                <span>•</span>
                <span>{formattedDate}</span>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <PortableText value={summary.summary} components={components} />
              </div>
            </article>
            <CommentSection postId={summary._id || summary.slug?.current || "fallback"} />
          </div>
        </main>
        <Footer />
      </div>
    </SlugNavbar>
  );
};

export default SummaryPage;
