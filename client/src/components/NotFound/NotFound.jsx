import React from 'react'
import notFound from '../../assets/img/404NotFound.png'
import { useNavigate } from "react-router-dom";
import './NotFound.css'

const NotFound = () => {

  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/pokemon')
  }

  return (
    <div className='notFound__container'>
        <img className='notFound__img' src={notFound} alt="" />
        <button className='notFound__btn' onClick={handleGoHome}>Go Home...</button>
    </div>
  )
}

export default NotFound