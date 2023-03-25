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

export type OnClickEvent = {
  onClick: () => void
}

export type Title = {
  title: string
}

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
