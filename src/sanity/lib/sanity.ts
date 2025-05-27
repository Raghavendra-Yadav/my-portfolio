import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2023-01-01',
  useCdn: true,
};

export const sanityClient = createClient(config);
export const urlFor = (source: any) => imageUrlBuilder(config).image(source);
