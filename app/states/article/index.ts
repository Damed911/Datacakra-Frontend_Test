import { atom } from 'recoil'
import { ListArticle } from '~/interfaces/article'

export const listArticleState = atom({
  key: 'listArticleStateKey',
  default: {} as ListArticle,
})
