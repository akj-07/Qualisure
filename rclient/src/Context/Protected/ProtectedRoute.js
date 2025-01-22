import React from 'react'
import { useUserAuth } from '../authContext/AuthContextProvider'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const { user } = useUserAuth();
    if (!user) {
        return <Navigate to='/login' replace/>
    }
  return children
}

export default ProtectedRoute