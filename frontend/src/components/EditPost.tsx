import './EditPost.scss'
import React, { useContext, useState } from "react"
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { PostType } from "./Post"

export const EditPost = () => {
  const { loggedIn, user } = useContext(AuthContext)
  const state: (PostType | null) = useLocation().state
  const { postId } = useParams()
  const navigate = useNavigate()

  if(!loggedIn || user?.id !== state?.author.id) return <Navigate to="/"></Navigate>

  const [title, setTitle] = useState<string>(state?.title || '')
  const [img, setImg] = useState<string>(state?.img || '')
  const [content, setContent] = useState<string>(state?.content || '')
  const [category, setCategory] = useState<string>(state?.category || '')

  const changeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    switch(e.target.name){
      case 'title': setTitle(e.target.value); break
      case 'content': setContent(e.target.value); break
      case 'category': setCategory(e.target.value); break
    }
  }

  const submitChanges = (e: React.FormEvent) => {
    e.preventDefault()
    fetch(`${import.meta.env['VITE_API_BASE_URL']}posts/${postId}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ title, content, category })
    })
    .then(res => res.json())
    .then(() => {
      navigate('/')
    })
    .catch(error => console.log(error))
  }

  return (
    <section className="edit-post">
      <h1>Upraviť post</h1>
      <form onSubmit={submitChanges}>
        <input type="text" name='title' value={title} onChange={changeInput} />
        <input type="file"/>
        <select name="category" onChange={changeInput} defaultValue={category}>
          <option value="">Vyberte kategóriu</option>
          <option value="art">Umenie</option>
          <option value="tech">Technológie</option>
          <option value="nature">Príroda</option>
          <option value="health">Zdravie</option>
        </select>
        <div className="img">
          <img src={img} />
        </div>
        <textarea name="content" value={content} onChange={changeInput}></textarea>
        <button type='submit'>Upraviť</button>
      </form>
    </section>
  )
}
