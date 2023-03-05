import { promises as fs } from 'fs'
import path from 'path'
import aliasDirs from 'alias-dirs'
import * as dotenv from 'dotenv'
import { logInfoMessage, logErrorMessage } from './logger.mjs'
import { fetchSlugs } from './utils/contentful.mjs'

dotenv.config()

const { DOMAIN, OUTPUT, PWD } = process.env

const FILE_OUTPUT = path.join(PWD, OUTPUT, 'sitemap-0.xml')

if (!OUTPUT) throw Error('You must assign an output directory for sitemaps')

const currentTime = new Date().toISOString()

const header = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n`
const footer = '\n</urlset>'

function genSlugUrl(slug) {
  return `<url><loc>${DOMAIN}${slug}</loc><lastmod>${currentTime}</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>`
}

;(async () => {
  try {
    const d = aliasDirs({
      alias: '',
      paths: ['../path0/*', '../output/*'],
      ignoreDirectories: ['node_modules'],
      suppressWarnings: true,
    })
    logInfoMessage('Fetching slugs')

    console.log(JSON.stringify(d, null, 2))
    process.exit(1)

    const { data } = await fetchSlugs()

    const explorationSlugs =
      data?.explorationsCollection?.items?.map(({ slug }) => `/explorations/${slug}/`) || []
    const explorationPages = Array.from({ length: Math.floor(explorationSlugs.length / 9) }).map(
      (_, i) => `/exporations/?page=${i + 2}`
    )
    logInfoMessage(
      `Mapped exploration slugs. Found ${explorationSlugs.length} explorations across ${explorationPages.length} pages`
    )

    const projectSlugs =
      data?.projectsCollection?.items?.map(({ slug }) => `/projects/${slug}/`) || []
    const projectPages = Array.from({ length: Math.floor(projectSlugs.length / 9) }).map(
      (_, i) => `/projects/?page=${i + 2}`
    )

    logInfoMessage(
      `Mapped project slugs. Found ${projectSlugs.length} across ${projectPages.length} pages`
    )

    if (!explorationSlugs.length || !projectSlugs.length)
      throw new Error('Unable to generate site maps as one more of the slug results are empty')

    const sitemapSlugs = [
      '/',
      '/background/',
      '/explorations/',
      ...explorationPages,
      ...explorationSlugs,
      '/projects/',
      ...projectPages,
      ...projectSlugs,
    ]
    const sitemapURLs = sitemapSlugs.map((slug) => genSlugUrl(slug)).join('\r\n')

    const file = header.concat(sitemapURLs).concat(footer)
    logInfoMessage('Combined sitemaps to single file')

    await fs.writeFile(FILE_OUTPUT, file, 'utf-8')

    logInfoMessage(`Successfully wrote sitemap to ${FILE_OUTPUT}`)
  } catch (error) {
    logErrorMessage(error.toString())
    process.exit(1)
  }
})()
