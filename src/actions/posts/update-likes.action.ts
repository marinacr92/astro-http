import { actions, defineAction } from 'astro:actions';
import { z } from 'astro:content';
import { db, Posts, eq } from 'astro:db';

export const updateLikes = defineAction({
  input: z.object({
    postId: z.string(),
    increment: z.number(),
  }),

  handler: async ({ postId, increment }) => {
    const posts = await db.select().from(Posts).where(eq(Posts.id, postId));

    if (posts.length === 0) {
      const newPost = {
        id: postId,
        title: 'Post not found',
        likes: 0,
      };

      await db.insert(Posts).values(newPost);
      posts.push(newPost);
    }
    const post = posts.at(0)!;
    await db
      .update(Posts)
      .set({ likes: post.likes + increment })
      .where(eq(Posts.id, postId));

    return true;
  },
});
