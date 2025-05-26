import { atom } from 'recoil'
import { CategoryArticle, ListCategory } from '~/interfaces/category'

export const listCategoryState = atom({
  key: 'listArticleStateKey',
  default: {} as ListCategory,
})

export const detailCategoryState = atom({
  key: 'detailArticleStateKey',
  default: {} as CategoryArticle,
})
