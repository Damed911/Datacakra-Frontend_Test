import { atom } from 'recoil'
import { DataArticle, ListArticle } from '~/interfaces/article'

export const listArticleState = atom({
  key: 'listArticleStateKey',
  default: {} as ListArticle,
})

export const detailArticleState = atom({
  key: 'detailArticleStateKey',
  default: {} as DataArticle,
})
