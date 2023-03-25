import { initTRPC } from '@trpc/server'
import * as z from 'zod'
import { getBackground, getHomepageCards } from './contentfulApi'
import { CONTENTFUL_BACKGROUND_PAGE, CONTENTFUL_PAGE_CARD } from './types'

export const trpc = initTRPC.create()

function logError(error: unknown) {
  const e = error instanceof z.ZodError ? JSON.stringify(error, null, 2) : error?.toString()
  console.error(e)
}

export const appRouter = trpc.router({
  homeCards: trpc.procedure
    .input(
      z
        .object({
          preview: z.boolean(),
        })
        .optional()
    )
    .output(CONTENTFUL_PAGE_CARD)
    .query(async ({ input }) => {
      try {
        const res = await getHomepageCards(input?.preview)
        return CONTENTFUL_PAGE_CARD.parse(res?.data?.homepageCardCollection?.items)
      } catch (error) {
        logError(error)
        return null
      }
    }),
  backgroundInfo: trpc.procedure
    .input(
      z
        .object({
          preview: z.boolean(),
        })
        .optional()
    )
    .output(CONTENTFUL_BACKGROUND_PAGE)
    .query(async ({ input }) => {
      try {
        const res = await getBackground(input?.preview)
        return CONTENTFUL_BACKGROUND_PAGE.parse(res?.data?.background)
      } catch (error) {
        logError(error)
        return null
      }
    }),
})

export default appRouter
