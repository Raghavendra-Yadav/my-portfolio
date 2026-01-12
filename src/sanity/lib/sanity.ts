import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { apiVersion, dataset, projectId } from '../env';

const config = {
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: process.env.SANITY_API_TOKEN, // Optional, for write operations
};

export const sanityClient = createClient(config);
export const urlFor = (source: any) => imageUrlBuilder(config).image(source);
