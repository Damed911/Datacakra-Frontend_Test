import { atom } from 'recoil'
import { CategoryArticle, ListCategory } from '~/interfaces/category'

export const listCategoryState = atom({
  key: 'listCategoryStateKey',
  default: {} as ListCategory,
})

export const detailCategoryState = atom({
  key: 'detailCategoryStateKey',
  default: {} as CategoryArticle,
})
