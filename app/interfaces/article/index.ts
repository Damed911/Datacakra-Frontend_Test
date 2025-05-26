import { ArticleComment } from '../comments'
import { CategoryArticle } from '../category'

export interface ParamsGetArticle {
  'pagination[page]': number
  'pagination[pageSize]': number
  'populate[comments][populate][user]': string
  'populate[user]': string
  'populate[category]': string
  'filters[title][$eqi]'?: string
  'filters[category][name][$eqi]'?: string
  populate: string
}

export interface DetailPost {
  title: string
  description: string
  cover_image_url: string
  category?: number
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
  comments: ArticleComment[]
  user: ArticleCreator
  category: CategoryArticle
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

export interface BodyPostArticle {
  data: DetailPost
}
