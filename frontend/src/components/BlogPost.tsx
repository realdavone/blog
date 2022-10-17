import './BlogPost.scss'
import { BlogPost as BlogPostType } from "../types/BlogPost"
import { Link } from 'react-router-dom'

export const BlogPost = (post: BlogPostType) => {
  return (
    <article className='article'>
      <h2>{post.title}</h2>
      <div className='undertitle'>
        <span>{new Date(post.published).toLocaleDateString('sk-SK')}</span>
        &nbsp;od&nbsp;
        <span>{post.author}</span>
      </div>
      <div className="content-holder">
        <div className="img">
          {post.img && <img src={`${import.meta.env['VITE_IMAGE_PATH']}${post.img}`}/>}
        </div>
        <p>{post.content}</p>
      </div>
      <Link to={`posts/${post.id}`}>Prejsť na článok</Link>
    </article>
  )
}
