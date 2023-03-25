/* istanbul ignore file */
import type {
  Block,
  Document,
  Inline,
  Mark,
  Node as ContentfulNode,
  Text,
} from '@contentful/rich-text-types'

export type { JSX, JSXElement, Ref } from 'solid-js'
export type JSXElement = JSX.Element

/// contentful types
export { Block, ContentfulNode, Document, Inline, Mark, Text }
export type BlockOrInline = Block | Inline
export type CommonNode = Text | BlockOrInline
export interface RenderNode {
  [k: string]: { (node: BlockOrInline, children: JSXElement): JSXElement }
}
export interface RenderMark {
  [k: string]: (text: JSXElement) => JSXElement
}
export interface RenderText {
  (text: string): JSXElement
}
export interface Options {
  renderNode?: RenderNode
  renderMark?: RenderMark
  renderText?: RenderText
}
///

export type AriaLabel = {
  ariaLabel?: string
}

export type Children = {
  children: JSXElement
}

export type ChildrenWithId = Children & {
  id: string
}

export type Href = {
  href: string
}

export type OptionalClassName = {
  className?: string
}

export type CONTENTFUL_ID = {
  sys: {
    id: string
  }
}

export type HeightAndWidth = {
  height: number
  width: number
}

export type OnClickEvent = {
  onClick: () => void
}

export type Title = {
  title: string
}

export type CONTENTFUL_IMAGE = HeightAndWidth &
  Title & {
    contentType: string
    description: string
    url: string
  }

export type CONTENTFUL_TITLE = Title

export type CONTENTFUL_SLUG = {
  slug: string
}

export type CONTENTFUL_JSON = {
  json: Document
}

export type CONTENTFUL_DESCRIPTION = {
  description: CONTENTFUL_JSON
}

export type CONTENTFUL_EXPLORATIONS_PAGE = {
  imagePriority: boolean
  sandboxId: string
  preview: CONTENTFUL_IMAGE
} & CONTENTFUL_ID &
  CONTENTFUL_TITLE &
  CONTENTFUL_SLUG

export type CONTENTFUL_PROJECTS_PAGE = {
  imagePriority: boolean
  seoDescription: string
  active: boolean
  status: string
  location?: string | null
  source: string
  preview: CONTENTFUL_IMAGE
  tech: Array<string>
  snapshotsCollection: {
    items: Array<CONTENTFUL_IMAGE>
  }
} & CONTENTFUL_ID &
  CONTENTFUL_TITLE &
  CONTENTFUL_DESCRIPTION &
  CONTENTFUL_SLUG

export type SitemapSlugs = Array<{
  slug: string
  title: string
}>

export interface AccessibleElement extends HTMLElement {
  readonly type?: string
  readonly href?: string
  readonly disabled?: boolean
  readonly rel?: string
}
