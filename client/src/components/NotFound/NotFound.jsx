import React from 'react'
import notFound from '../../assets/img/404NotFound.png'
import './NotFound.css'

const NotFound = () => {
  return (
    <div className='notFound__container'>
        <img className='notFound__img' src={notFound} alt="" />
    </div>
  )
}

export default NotFound