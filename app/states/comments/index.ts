import { atom } from 'recoil'
import { ArticleComment, ListComment } from '~/interfaces/comments'

export const listCommentState = atom({
  key: 'listCommentStateKey',
  default: {} as ListComment,
})

export const detailCommentState = atom({
  key: 'detailCommentStateKey',
  default: {} as ArticleComment,
})
