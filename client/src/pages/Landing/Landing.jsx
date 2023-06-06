import React from 'react'
import videoBg from '../../assets/video/bg-landing.mp4'
import logo from '../../assets/img/logo.png'
import './Landing.css'
import { Link } from 'react-router-dom'

const Landing = () => {
    return (
        <div className="container__landing">
            <section className="bg__landing">
                <video src={videoBg} muted autoPlay loop />
            </section>
            <section className='main__landing'>
                <img className='img__landing' src={logo} alt="" />
                <h1 className="title__landing">Hi Trainer!!</h1>
                <p className="paragraph__landing">Let's go for your pokemon</p>
                <form className='form__landing'>
                    <Link to='/pokemon'><button className='btn__landing'>Go!!!</button></Link>
                </form>
            </section>
        </div>
    )
}

export default Landing