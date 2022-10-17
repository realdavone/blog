import { Routes, Route } from "react-router-dom"

import { Post } from "../components/Post"
import { NewPost } from '../components/NewPost'
import { EditPost } from "../components/EditPost"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { GuardedRoute } from "../components/GuardedRoute"

export const Posts = () => {
  const { loggedIn } = useContext(AuthContext)

  return (
    <Routes>
      <Route path="new" element={ 
        <GuardedRoute auth={loggedIn} redirectTo={'/login'}>
          <NewPost />
        </GuardedRoute>
      } />
      <Route path=":postId" element={ <Post /> } />
      <Route path=":postId/edit" element={
        <GuardedRoute auth={loggedIn} redirectTo={'/login'}>
          <EditPost />
        </GuardedRoute>
      } />
      <Route path="" element={ <div>xd</div> } />
    </Routes>
  )
}