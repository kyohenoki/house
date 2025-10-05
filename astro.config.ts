import cloudflare from '@astrojs/cloudflare'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import solid from '@astrojs/solid-js'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://kyohenoki.com',
  integrations: [
    sitemap(),
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: {
        themes: {
          light: 'vitesse-light',
          dark: 'vitesse-dark',
        },
      },
    }),
    solid({
      include: '**/solid/*',
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: cloudflare({
    imageService: 'compile',
  }),
  build: {
    assets: '_house',
  },
  devToolbar: {
    enabled: false,
  },
})
