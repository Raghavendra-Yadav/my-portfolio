import { GetStaticPaths, GetStaticProps } from 'next';
import { useEffect, useState, useRef } from 'react';
import { sanityClient } from '@/sanity/lib/sanity';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import SlugNavbar from '@/components/SlugNavbar';
import {
  FaComments,
  FaCheckCircle,
  FaHeart,
  FaThumbsUp,
  FaArrowUp,
} from 'react-icons/fa';
import Footer from '@/components/Footer';

interface Post {
  _id: string;
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

interface Block {
  _type: string;
  children?: { text: string }[];
  style?: string;
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

const GradientAvatar = ({ name }: { name: string }) => (
  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 text-white flex items-center justify-center font-bold text-xl shadow-lg border-2 border-white dark:border-gray-900 transition-all">
    {name?.charAt(0)?.toUpperCase() || '?'}
  </div>
);

const AnimatedSpinner = () => (
  <div className="flex justify-center py-8">
    <svg
      className="animate-spin h-8 w-8 text-indigo-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8z"
      />
    </svg>
  </div>
);

const AnimatedSuccess = () => (
  <div className="flex flex-col items-center py-8">
    <FaCheckCircle className="text-green-500 animate-bounce mb-2" size={40} />
    <p className="text-green-600 dark:text-green-400 font-medium text-lg text-center">
      Thank you! Your comment will appear after approval.
    </p>
  </div>
);

interface VotedComments {
  likes: string[];
  upvotes: string[];
}

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
          <div className="w-full max-w-2xl px-4">
            <article className="py-24">
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
            <CommentSection postId={post._id} />
          </div>
        </main>
        <Footer />
      </div>
    </SlugNavbar>
  );
};

const CommentSection = ({ postId }: { postId: string }) => {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', comment: '' });
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [votedComments, setVotedComments] = useState<VotedComments>({
    likes: [],
    upvotes: [],
  });
  const [votingInProgress, setVotingInProgress] = useState<{
    [key: string]: boolean;
  }>({});
  const eventSourceRefs = useRef<{ [key: string]: EventSource }>({});
  const userIdRef = useRef<string>('');
  const commentStatesRef = useRef<{ [key: string]: any }>({});

  // Initialize user ID and voted comments from localStorage
  useEffect(() => {
    // Generate and store user ID if not exists
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = crypto.randomUUID();
      localStorage.setItem('userId', userId);
    }
    userIdRef.current = userId;

    // Load voted comments from localStorage using userId
    const storedVotes = localStorage.getItem(`votes_${postId}_${userId}`);
    if (storedVotes) {
      setVotedComments(JSON.parse(storedVotes));
    }
  }, [postId]);

  // Initial comments fetch
  useEffect(() => {
    setLoading(true);
    fetch(`/api/comments?postId=${postId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Store initial comment states
          data.forEach((comment) => {
            commentStatesRef.current[comment._id] = { ...comment };
          });
          setComments(data);
          // Set up SSE for each comment
          data.forEach((comment) => {
            setupEventSource(comment._id);
          });
        } else {
          setComments([]);
        }
      })
      .catch(() => setComments([]))
      .finally(() => setLoading(false));

    // Cleanup function
    return () => {
      Object.values(eventSourceRefs.current).forEach((eventSource) => {
        eventSource.close();
      });
    };
  }, [postId]);

  const setupEventSource = (commentId: string) => {
    // Close existing event source if any
    if (eventSourceRefs.current[commentId]) {
      eventSourceRefs.current[commentId].close();
    }

    // Create new event source
    const eventSource = new EventSource(`/api/comments/${commentId}/events`);
    eventSourceRefs.current[commentId] = eventSource;

    eventSource.onmessage = (event) => {
      const updatedComment = JSON.parse(event.data);
      // Update the stored comment state
      commentStatesRef.current[commentId] = {
        ...commentStatesRef.current[commentId],
        likes: updatedComment.likes,
        upvotes: updatedComment.upvotes,
      };

      // Update the comments state with the new counts
      setComments((prev) =>
        prev.map((comment) =>
          comment._id === commentId
            ? {
                ...comment,
                likes: updatedComment.likes,
                upvotes: updatedComment.upvotes,
              }
            : comment
        )
      );
    };

    eventSource.onerror = () => {
      eventSource.close();
      // Attempt to reconnect after a delay
      setTimeout(() => setupEventSource(commentId), 5000);
    };
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, postId }),
    });
    setSubmitted(true);
    formRef.current?.reset();
  };

  const handleVote = async (commentId: string, type: 'like' | 'upvote') => {
    const userId = userIdRef.current;
    if (!userId) return;

    // Check if voting is in progress for this comment
    const voteKey = `${commentId}_${type}`;
    if (votingInProgress[voteKey]) {
      console.log('Vote in progress, ignoring click');
      return;
    }

    const voteTypeKey = type === 'like' ? 'likes' : 'upvotes';
    const hasVoted = votedComments[voteTypeKey].includes(commentId);
    const action = hasVoted ? 'remove' : 'add';

    // Set voting in progress
    setVotingInProgress((prev) => ({ ...prev, [voteKey]: true }));

    try {
      const response = await fetch(`/api/comments/${commentId}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, action }),
      });

      if (response.ok) {
        // Update voted comments in state and localStorage using userId
        const newVotedComments = {
          ...votedComments,
          [voteTypeKey]:
            action === 'add'
              ? [...votedComments[voteTypeKey], commentId]
              : votedComments[voteTypeKey].filter((id) => id !== commentId),
        };
        setVotedComments(newVotedComments);
        localStorage.setItem(
          `votes_${postId}_${userId}`,
          JSON.stringify(newVotedComments)
        );
      }
    } catch (error) {
      console.error('Error voting:', error);
    } finally {
      // Clear voting in progress after a short delay
      setTimeout(() => {
        setVotingInProgress((prev) => ({ ...prev, [voteKey]: false }));
      }, 500);
    }
  };

  return (
    <section className="mt-16 mb-16">
      <div className="flex items-center gap-2 mb-8">
        <FaComments className="text-indigo-500" size={28} />
        <h2 className="text-2xl font-bold tracking-tight">Discussion</h2>
        <span className="ml-2 bg-gradient-to-r from-indigo-400 to-pink-400 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
          {comments.length}
        </span>
      </div>
      <div className="bg-white/90 dark:bg-gray-900/80 border border-indigo-100 dark:border-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 transition-all">
        {/* Comments */}
        {loading ? (
          <AnimatedSpinner />
        ) : comments.length === 0 ? (
          <div className="text-gray-500 dark:text-gray-400 text-center mb-8 italic">
            No comments yet. Be the first to start the conversation!
          </div>
        ) : (
          <ul className="divide-y divide-indigo-100 dark:divide-gray-800 mb-10">
            {comments.map((c) => (
              <li
                key={c._id}
                className="flex items-start gap-4 py-6 first:pt-0 last:pb-0"
              >
                <GradientAvatar name={c.name} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {c.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(c.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="pl-4 border-l-4 border-indigo-200 dark:border-indigo-700 text-gray-800 dark:text-gray-200 mt-1 text-base leading-relaxed">
                    {c.comment}
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <button
                      onClick={() => handleVote(c._id, 'like')}
                      disabled={votingInProgress[`${c._id}_like`]}
                      className={`flex items-center gap-1 transition-colors ${
                        votedComments.likes.includes(c._id)
                          ? 'text-pink-500 hover:text-pink-600'
                          : 'text-gray-500 hover:text-pink-500'
                      } ${votingInProgress[`${c._id}_like`] ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <FaHeart
                        className={
                          votedComments.likes.includes(c._id)
                            ? 'text-pink-500'
                            : ''
                        }
                      />
                      <span className="text-sm">{c.likes || 0}</span>
                    </button>
                    <button
                      onClick={() => handleVote(c._id, 'upvote')}
                      disabled={votingInProgress[`${c._id}_upvote`]}
                      className={`flex items-center gap-1 transition-colors ${
                        votedComments.upvotes.includes(c._id)
                          ? 'text-indigo-500 hover:text-indigo-600'
                          : 'text-gray-500 hover:text-indigo-500'
                      } ${votingInProgress[`${c._id}_upvote`] ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <FaArrowUp
                        className={`transition-colors ${
                          votedComments.upvotes.includes(c._id)
                            ? 'text-indigo-500'
                            : ''
                        }`}
                      />
                      <span className="text-sm">{c.upvotes || 0}</span>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        {/* Form */}
        <div className="pt-8 border-t border-indigo-100 dark:border-gray-800 mt-8">
          {submitted ? (
            <AnimatedSuccess />
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6 max-w-xl mx-auto"
              autoComplete="off"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="flex-1 border border-gray-300 dark:border-gray-700 rounded-full px-5 py-3 bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all shadow"
                  onChange={handleChange}
                  autoComplete="off"
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Your email"
                  className="flex-1 border border-gray-300 dark:border-gray-700 rounded-full px-5 py-3 bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all shadow"
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
              <textarea
                name="comment"
                required
                placeholder="Write your comment..."
                className="w-full border border-gray-300 dark:border-gray-700 rounded-2xl px-5 py-3 bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all shadow resize-none"
                rows={4}
                onChange={handleChange}
                maxLength={500}
              />
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  Your email will not be published.
                </span>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white px-8 py-2 rounded-full font-semibold shadow-md transition-all focus:ring-2 focus:ring-pink-400"
                >
                  Post Comment
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "blogPost" && slug.current == $slug][0]{
    _id,
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
