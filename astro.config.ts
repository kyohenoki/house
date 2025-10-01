import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import sitemap from '@astrojs/sitemap'
import mdx from '@astrojs/mdx'
import cloudflare from '@astrojs/cloudflare'
import react from '@astrojs/react'

export default defineConfig({
  site: 'https://kyohenoki.com',
  integrations: [
    sitemap(),
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: { theme: 'vitesse-light' },
    }),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: cloudflare({
    imageService: 'cloudflare',
  }),
  build: {
    assets: '_house',
  },
  devToolbar: {
    enabled: false,
  },
})
