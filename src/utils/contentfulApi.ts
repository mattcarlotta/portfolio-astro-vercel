import { BACKGROUND, EXPLORATIONS, HOMEPAGE_CARDS, PROJECTS } from './contentfulGql'

async function tryJSON(res: Response) {
  try {
    const data = await res.json()
    return data
  } catch (error) {
    return null
  }
}

async function fetchGraphQL(query: string, preview = false) {
  const res = await fetch(
    `${import.meta.env.CONTENTFUL_BASE_URL}${import.meta.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          preview
            ? import.meta.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : import.meta.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
    }
  )

  const json = await tryJSON(res)

  if (!res.ok || json.errors) {
    console.error(
      `Error: Unable to complete a request to Contentful GQL endpoint. Reason: ${String(
        json?.errors?.[0]?.message || json?.message
      )}`
    )
    return Promise.resolve(null)
  }

  return json
}

export function getHomepageCards() {
  return fetchGraphQL(
    `query {
      homepageCardCollection(order: sys_firstPublishedAt_DESC) {
        items {
          ${HOMEPAGE_CARDS}
        }
      }
    }
    `
  )
}

export function getBackground(preview?: boolean) {
  return fetchGraphQL(
    `query {
      background(id: "${import.meta.env.CONTENTFUL_BACKGROUND_ID}", preview: ${
      preview ? 'true' : 'false'
    }) {
        ${BACKGROUND}
      }
    }
    `,
    preview
  )
}

export function getExplorationBySlug(slug?: string, preview?: boolean) {
  return fetchGraphQL(
    `query {
      explorationsCollection(where: { slug: "${slug}" }, preview: ${
      preview ? 'true' : 'false'
    }, limit: 1) {
        items {
          ${EXPLORATIONS}
        }
      }
    }
    `,
    preview
  )
}

export function getAllExplorations(page = 1) {
  return fetchGraphQL(
    `query {
      explorationsCollection(order: sys_firstPublishedAt_DESC, limit: 9, skip: ${page * 9}) {
        total
        items {
          ${EXPLORATIONS}
        }
      }
    }
    `
  )
}

export function getProjectBySlug(slug?: string, preview?: boolean) {
  return fetchGraphQL(
    `query {
      projectsCollection(where: { slug: "${slug}" }, preview: ${
      preview ? 'true' : 'false'
    }, limit: 1) {
        items {
          ${PROJECTS}
        }
      }
    }
    `,
    preview
  )
}

export function getAllProjects(page = 1) {
  return fetchGraphQL(
    `query {
      projectsCollection(order: sys_firstPublishedAt_DESC, limit: 9, skip: ${page * 9}) {
        total
        items {
          ${PROJECTS}
        }
      }
    }
    `
  )
}

export async function fetchProjectSlugs() {
  return fetchGraphQL(
    `query {
      projectsCollection(order: sys_firstPublishedAt_DESC) {
        items {
          slug
          title
        }
      }
    }
    `
  )
}

export async function fetchExplorationSlugs() {
  return fetchGraphQL(
    `query {
      explorationsCollection(order: sys_firstPublishedAt_DESC) {
        items {
          slug
          title
        }
      }
    }
    `
  )
}
