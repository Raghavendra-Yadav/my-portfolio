import { GetStaticPaths, GetStaticProps } from 'next';
import { sanityClient } from '@/sanity/lib/sanity';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import SlugNavbar from '@/components/SlugNavbar';

interface Post {
  title: string;
  body: any;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `*[_type == "blogPost"]{ slug }`;
  const posts = await sanityClient.fetch(query);

  const paths = posts.map((p: any) => ({
    params: { slug: p.slug.current },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "blogPost" && slug.current == $slug][0]{
    title,
    body
  }`;
  const post = await sanityClient.fetch(query, { slug: params?.slug });

  return { props: { post } };
};

const BlogSlugPage = ({ post }: { post: Post }) => (
  <SlugNavbar>
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
        <div className="prose dark:prose-invert max-w-none">
          <PortableText value={post.body} />
        </div>
      </main>
    </div>
  </SlugNavbar>
);

export default BlogSlugPage;
