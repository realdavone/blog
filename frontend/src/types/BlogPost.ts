export type BlogPost = {
  id: number,
  title: string,
  img: string | null,
  published: Date,
  author: string | null,
  content: string
}