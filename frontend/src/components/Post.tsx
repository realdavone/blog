import './Post.scss'
import { Link, useNavigate, useParams } from "react-router-dom"
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import useFetch from '../hooks/fetch'

export type PostType = {
  id: string,
  title: string,
  published: string,
  category?: string,
  author: {
    email: string,
    id: string
  },
  img?: string | null,
  content: string
}

interface PostFetchResponse {
  loading: boolean,
  data: PostType | null,
  error: string | null
}

export const Post = () => {
  const { postId } = useParams()
  const { user } = useContext(AuthContext)
  const { loading, data: post, error }: PostFetchResponse = useFetch(`posts/${postId}`)
  const navigate = useNavigate()

  const removePost = (): void => {
    fetch(`${import.meta.env['VITE_API_BASE_URL']}posts/${postId}`, { method: 'DELETE' }).then(res => res.json()).then(data => { data.success && navigate('/') })
  }

  return (
    <section className="post">
      {loading && <span>Načítavam...</span>}
      {post !== null
      ?
      <>
        { post?.category && 
        <div className="categories">
          { post.category && <Link to={"/hashtags/" + post.category}>{post.category}</Link> }
        </div>
        }
        <h1>{post.title}</h1>
        <div className="undertitle">
          <span>{new Date(post.published).toLocaleDateString('sk-SK')}</span>
          <span>{post.author.email}</span>
        </div>
        { user?.id === post.author.id && 
        <div className="controls">
          <Link to={`edit`} state={post}>&#x270F;</Link>
          <button onClick={() => removePost()}>&times;</button>
        </div>
        }
        <div className="img">
          {post.img && <img src={`${import.meta.env['VITE_IMAGE_PATH']}${post.img}`}/>}
        </div>
        <div className="content">
          {post.content}
        </div>
      </>
      :
      ''
      }
      {error && <span>{error}</span>}
    </section>
  )
}