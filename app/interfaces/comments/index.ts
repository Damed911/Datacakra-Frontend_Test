import { ArticleCreator, MetaArticle } from '../article'

export interface ParamsGetComment {
  page: number
  size: number
  article: string
  populate: string
  sort: string
}

export interface BodyComment {
  content: string
  article?: number
}

export interface BodyPostComment {
  data: BodyComment
}

export interface ArticleComment {
  id: number
  documentId: string
  content: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: string
  user?: ArticleCreator
}

export interface ListComment {
  data: ArticleComment[]
  meta: MetaArticle
}
