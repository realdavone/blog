import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './NewPost.scss'

type NewPost = {
  title: string,
  category: string | null,
  content: string
}

const INITIAL_POST: NewPost = {
  title: '',
  category: '',
  content: ''
}

interface NewPostFetchResponse {
  success: boolean,
  message?: string
}

export const NewPost = () => {
  const [post, setPost] = useState<NewPost>(INITIAL_POST)
  const [img, setImg] = useState<string | Blob>('')
  const navigate = useNavigate()

  const handleFile = (e: any) => {
    const supportedFileTypes: Array<string> = ['jpg', 'jpeg', 'png']
    const fileExtension: string = e.target.files[0].name.split('.').pop()

    if(!supportedFileTypes.includes(fileExtension)) return e.target.value = ''

    setImg(e.target.files[0])
  }
  const inputUpdate = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setPost(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const uploadImage = (): Promise<string> => {
    const formData = new FormData()
    formData.append('image', img)

    const url = fetch(import.meta.env['VITE_UPLOAD_BASE_URL'], { method: 'POST', body: formData })
    .then(res => res.json())
    .then(url => url)
    .catch(() => '')

    return url
  }
  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault()

    const imgUrl = (img !== '' ? await uploadImage() : null)

    fetch(`${import.meta.env['VITE_API_BASE_URL']}posts/new`, { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: post.title, content: post.content, category: post.category, img: imgUrl })
    })
    .then(res => res.json())
    .then((data: NewPostFetchResponse) => {
      if(data.success) navigate('/')
    })
  }
  return (
    <section className='new-post'>
      <h1>Nový post</h1>
      <form onSubmit={submitPost}>
        <input type="text" name="title" placeholder="Názov" required onChange={inputUpdate} />
        <input type="file" onChange={handleFile} />
        <span className='file-ext-warning'>Povolené súborý sú len jpg, jpeg a png</span>
        <select name="category" onChange={inputUpdate}>
          <option value="">Vyberte kategóriu</option>
          <option value="art">Umenie</option>
          <option value="tech">Technológie</option>
          <option value="nature">Príroda</option>
          <option value="health">Zdravie</option>
        </select>
        <textarea name="content" onChange={inputUpdate} placeholder="Obsah"></textarea>
        <button type="submit">Zverejniť</button>
      </form>
    </section>
  )
}
