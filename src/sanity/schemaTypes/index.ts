import { type SchemaTypeDefinition } from 'sanity';
import blogPost from './blogPost';
import bookSummary from './bookSummary';
import blockContent from './blockContent';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blogPost, bookSummary, blockContent],
};
