export interface ParamsGetArticle {
  page: number
  size: number
  comments: string
  user: string
  category: string
  title?: string
  categoryName?: string
  populate: string
}

export interface BodyPostArticle {
  title: string
  description: string
  cover_image_url: string
  category: number
}
