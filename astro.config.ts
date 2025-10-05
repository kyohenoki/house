import cloudflare from '@astrojs/cloudflare'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://kyohenoki.com',
  integrations: [sitemap(), react(), (await import('@playform/compress')).default()],
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
