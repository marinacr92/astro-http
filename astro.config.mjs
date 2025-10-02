// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// import node from '@astrojs/node';

import cloudflare from '@astrojs/cloudflare';

import db from '@astrojs/db';

import vue from '@astrojs/vue';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap(), db(), vue(), react()],

  adapter: cloudflare(),
});
