import './Hashtags.scss'
import { NavLink, Route, Routes, useParams } from "react-router-dom"
import useFetch from '../hooks/fetch'
import { BlogPost } from '../components/BlogPost'
import { FetchPosts } from './Home'
import { BlogPost as BlogPostType } from '../types/BlogPost'

export const Hashtags = () => {
  return (
    <section className='hashtags'>
      <div className="categories">
        <NavLink to='art'>Umenie</NavLink>
        <NavLink to='tech'>Tech</NavLink>
        <NavLink to='nature'>Nature</NavLink>
        <NavLink to='health'>Health</NavLink>
      </div>
      <div className="content">
        <Routes>
          <Route path=":category" element={ <Hashtag /> } />
          <Route path='' element={ <div>Vyberte kategóriu</div> }/>
        </Routes>
      </div>
    </section>
  )
}

const Hashtag = () => {
  const { category } = useParams()

  const { loading, data, error }: FetchPosts = useFetch(`posts/categories/${category}`)

  return (
    <div>
      <>
      {loading && <span>Načítavam...</span>}
      {data && data.length!==0 && data.map((post: BlogPostType, index: number) => <BlogPost {...post} key={index}/>) }
      {error && <span>{error}</span>}
      </>
    </div>
  )
}
