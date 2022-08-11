import React from 'react'
import './header.css'
import CTA from './CTA'
// import ME from '../../assets/me_6.png'
import ME from '../../assets/me_new_2.png'
import HeaderSocials from './HeaderSocials'
import Typist from 'react-typist'
import "react-typist/dist/Typist.css"
// import FadeIn from '../fadein'

const header = () => {
  return (
    <header>
      <div className='container header__container'>
      <Typist avgTypingDelay={250}>
          <span className="intro-title">
            {"hi, "}
            <span className="intro-name">{"kanav"}</span>
            {" here."}
          </span>
        </Typist>
        <h2 className="text-light">I'm an aspiring Machine Learning Engineer</h2>
        <CTA />
        <HeaderSocials/>
        <div className='me'>
          <img src={ME} alt="me" />
        </div>        
        <a href='#footer' className='scroll__down'>Scroll Down</a>

      </div>
    </header>
  )
}

export default header