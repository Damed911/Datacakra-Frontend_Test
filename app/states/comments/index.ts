import { atom } from 'recoil'
import { ArticleComment, ListComment } from '~/interfaces/comments'

export const listCommentState = atom({
  key: 'listArticleStateKey',
  default: {} as ListComment,
})

export const detailCommentState = atom({
  key: 'detailArticleStateKey',
  default: {} as ArticleComment,
})
