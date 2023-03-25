import { z } from 'zod'

export const CONTENTFUL_ID = z.object({
  sys: z.object({
    id: z.string(),
  }),
})

export const HeightAndWidth = z.object({
  height: z.number(),
  width: z.number(),
})

export const Title = z.object({
  title: z.string(),
})

export const CONTENTFUL_IMAGE = HeightAndWidth.merge(Title).merge(
  z.object({
    contentType: z.string(),
    description: z.string(),
    url: z.string(),
  })
)

export const CONTENTFUL_TITLE = Title

export const CONTENTFUL_SLUG = z.object({
  slug: z.string(),
})

export const CONTENTFUL_JSON = z.object({
  json: z.any(),
})

export const CONTENTFUL_DESCRIPTION = z.object({
  description: CONTENTFUL_JSON,
})

export const CONTENTFUL_PAGE_CARD = z
  .array(
    z
      .object({
        description: z.string(),
        imagePriority: z.boolean(),
        preview: CONTENTFUL_IMAGE,
      })
      .merge(CONTENTFUL_ID)
      .merge(CONTENTFUL_TITLE)
      .merge(CONTENTFUL_SLUG)
  )
  .nullable()

export type HomePage = z.TypeOf<typeof CONTENTFUL_PAGE_CARD>

export const CONTENTFUL_BACKGROUND_PAGE = z
  .object({
    profileImage: CONTENTFUL_IMAGE,
    location: z.string(),
    rank: z.string(),
    email: z.string(),
    tech: z.object({
      data: z.array(
        z.object({
          level: z.number(),
          technology: z.string(),
        })
      ),
    }),
    education: z.object({
      data: z.array(
        z.object({
          url: z.string(),
          title: z.string(),
        })
      ),
    }),
  })
  .merge(CONTENTFUL_ID)
  .merge(CONTENTFUL_TITLE)
  .merge(CONTENTFUL_DESCRIPTION)
  .nullable()

export type BackgroundPage = z.TypeOf<typeof CONTENTFUL_BACKGROUND_PAGE>
