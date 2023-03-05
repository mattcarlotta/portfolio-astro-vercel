import solid from '@astrojs/solid-js'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/serverless'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [tailwind(), solid()],
  adapter: vercel(),
  server: { port: 4000 },
})
