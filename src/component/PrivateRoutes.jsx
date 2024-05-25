import React from 'react'
import { useSelector } from 'react-redux'
import { redirect } from 'react-router-dom'

const PrivateRoutes = ({Component ,...rest}) => {
    const isAccessible = useSelector(store => store?.user?.user)
  return (
  <>
    {
        isAccessible ? <Component {...rest}/> : redirect('/login')
    }
  </>
  )
}

export default PrivateRoutes
