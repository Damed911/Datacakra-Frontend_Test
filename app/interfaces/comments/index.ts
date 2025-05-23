export interface ParamsGetComment {
  page: number
  size: number
  article: string
  populate: string
  sort: string
}

export interface BodyPostComment {
  content: string
  article: number
}
