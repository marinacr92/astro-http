import { getCollection } from 'astro:content';
import { Clients, db, Posts } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Clients).values([
    { id: 1, name: 'Kasim', age: 35, isActive: true },
    { id: 2, name: 'Fernando', age: 33, isActive: true },
    { id: 3, name: 'Carlos', age: 20, isActive: true },
    { id: 4, name: 'Melissa', age: 45, isActive: true },
    { id: 5, name: 'Emin', age: 24, isActive: true },
  ]);

  const posts = await getCollection('blog');

  await db.insert(Posts).values(
    posts.map((p) => ({
      id: p.id,
      title: p.data.title,
      likes: Math.round(Math.random() * 100),
    }))
  );

  console.log('Seed executed');
}
