import { MetaArticle } from '../article'

export interface BodyCategory {
  name: string
}

export interface CategoryArticle {
  id: number
  documentId: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string
}

export interface ListCategory {
  data: CategoryArticle[]
  meta: MetaArticle
}
