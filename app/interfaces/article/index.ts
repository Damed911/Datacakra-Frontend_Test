import { ArticleComment } from '../comments'
import { CategoryArticle } from '../category'

export interface ParamsGetArticle {
  page: number
  size: number
  comments: string
  user: string
  category: string
  title?: string
  categoryName?: string
  populate: string
}

export interface BodyPostArticle {
  title: string
  description: string
  cover_image_url: string
  category: number
}

export interface ArticleCreator {
  id: number
  documentId: string
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string
}

export interface DataArticle {
  id: number
  documentId: string
  title: string
  description: string
  cover_image_url: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string
  comments?: ArticleComment[]
  user?: ArticleCreator
  category?: CategoryArticle
}

export interface MetaArticle {
  pagination: {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
}

export interface ListArticle {
  data: DataArticle[]
  meta: MetaArticle
}
