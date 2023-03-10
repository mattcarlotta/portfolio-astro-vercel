import type { APIContext } from 'astro'

export async function get({ params, redirect }: APIContext) {
  const { secret, slug } = params

  if (!slug || secret !== import.meta.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN) {
    return new Response(null, {
      status: 404,
      statusText: 'Not found',
    })
  }

  return redirect(`${slug}?preview=true`, 307)
}
