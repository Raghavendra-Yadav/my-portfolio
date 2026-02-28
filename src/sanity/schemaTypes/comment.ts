import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'comment',
    title: 'Comment',
    type: 'document',
    fields: [
        defineField({ name: 'name', title: 'Name', type: 'string' }),
        defineField({ name: 'email', title: 'Email', type: 'string' }),
        defineField({ name: 'comment', title: 'Comment', type: 'text' }),
        defineField({
            name: 'post',
            title: 'Post',
            type: 'reference',
            to: [{ type: 'blogPost' }, { type: 'bookSummary' }],
        }),
        defineField({
            name: 'approved',
            title: 'Approved',
            type: 'boolean',
            initialValue: true, // Auto-approve for now, change to false if you want moderation
        }),
        defineField({
            name: 'createdAt',
            title: 'Created At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: 'likes',
            title: 'Likes',
            type: 'number',
            initialValue: 0,
        }),
        defineField({
            name: 'upvotes',
            title: 'Upvotes',
            type: 'number',
            initialValue: 0,
        }),
        defineField({
            name: 'parentComment',
            title: 'Parent Comment',
            type: 'reference',
            to: [{ type: 'comment' }],
            description: 'If this is a reply, this references the parent comment.',
        }),
    ],
});
