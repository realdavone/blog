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
  const [imgUrl, setImgUrl] = useState<string>(state?.img || '')
  const [img, setImg] = useState<Blob | null>(null)
  const [content, setContent] = useState<string>(state?.content || '')
  const [category, setCategory] = useState<string>(state?.category || '')

  const changeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    switch(e.target.name){
      case 'title': setTitle(e.target.value); break
      case 'content': setContent(e.target.value); break
      case 'category': setCategory(e.target.value); break
    }
  }
  const handleFile = (e: any) => {
    const supportedFileTypes: Array<string> = ['jpg', 'jpeg', 'png']
    const fileExtension: string = e.target.files[0].name.split('.').pop()

    if(!supportedFileTypes.includes(fileExtension)) return e.target.value = ''

    setImg(e.target.files[0])
  }
  const uploadImage = (): Promise<string> => {
    if(img === null) return Promise.resolve('')
    const formData = new FormData()
    formData.append('image', img)

    const url = fetch(import.meta.env['VITE_UPLOAD_BASE_URL'], { method: 'POST', body: formData })
    .then(res => res.json())
    .then(url => url)
    .catch(() => '')

    return url
  }
  const submitChanges = async (e: React.FormEvent) => {
    e.preventDefault()

    const newImgUrl = (img !== null ? await uploadImage() : imgUrl !== '' ? imgUrl : null)

    fetch(`${import.meta.env['VITE_API_BASE_URL']}posts/${postId}`, { method: 'PUT', credentials: 'include', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, category, img: newImgUrl })
    })
    .then(res => res.json())
    .then(() => navigate('/'))
    .catch(error => console.log(error))
  }
  return (
    <section className="edit-post">
      <h1>Upraviť post</h1>
      <form onSubmit={submitChanges}>
        <input type="text" name='title' value={title} onChange={changeInput} />
        <input type="file" onChange={handleFile}/>
        <select name="category" onChange={changeInput} defaultValue={category}>
          <option value="">Vyberte kategóriu</option>
          <option value="art">Umenie</option>
          <option value="tech">Technológie</option>
          <option value="nature">Príroda</option>
          <option value="health">Zdravie</option>
        </select>
        {imgUrl &&
        <div className="img">
          <img src={`${import.meta.env['VITE_IMAGE_PATH']}${imgUrl}`} />
        </div>
        }
        <textarea name="content" value={content} onChange={changeInput}></textarea>
        <button type='submit'>Upraviť</button>
      </form>
    </section>
  )
}
