import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { fetchBlogPost, fetchAllBlogSlugs } from '../../utils/api';

const BlogPost = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <article>
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <div className="mt-4" dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await fetchAllBlogSlugs();
  const paths = slugs.map(slug => ({ params: { slug } }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await fetchBlogPost(params.slug);

  return {
    props: {
      post,
    },
    revalidate: 10, // Revalidate at most every 10 seconds
  };
};

export default BlogPost;