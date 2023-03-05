import fetch from 'node-fetch'

const slugQuery = `query {
  explorationsCollection(order: sys_firstPublishedAt_DESC) {
    items {
      slug
    }
  }
  projectsCollection(order: sys_firstPublishedAt_DESC) {
    items {
      slug
    }
  }
}
`

export async function fetchSlugs() {
  const res = await fetch(`${process.env.CONTENTFUL_BASE_URL}${process.env.CONTENTFUL_SPACE_ID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ query: slugQuery }),
  })
  return res.ok ? await res.json() : Promise.reject('Unable to retrieve contentful slugs')
}
