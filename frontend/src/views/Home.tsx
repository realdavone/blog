import { BlogPost as BlogPostType } from "../types/BlogPost"
import { BlogPost } from "../components/BlogPost"
import useFetch from "../hooks/fetch"

export interface FetchPosts {
  loading: boolean,
  data: Array<BlogPostType> | null,
  error: string | null
}

export const Home = () => {
  const { loading, data, error }: FetchPosts = useFetch('posts')

  return (
    <main>
      <section>
        { loading && <span>Načítavam...</span> }
        { 
        data !== null && data.length > 0
        ?
        data.map((post: BlogPostType, index: number) => <BlogPost {...post} key={index}/>)
        :
        data !== null && data.length === 0
        ?
        <span>Žiadne posty</span>
        :
        ''
        }
        { error !== null && <span>{ error }</span> }
      </section>
    </main>
  )
}