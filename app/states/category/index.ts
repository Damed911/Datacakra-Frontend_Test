import { atom } from 'recoil'
import { ListCategory } from '~/interfaces/category'

export const listCategoryState = atom({
  key: 'listCategoryStateKey',
  default: {} as ListCategory,
})
