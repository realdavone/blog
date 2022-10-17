import { Navigate } from "react-router-dom"

export const GuardedRoute = ({ children, auth, redirectTo }: any) => {
  if(!auth) return <Navigate to={ redirectTo } />
  return children
}