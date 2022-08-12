import React from 'react'
import {FaLinkedinIn} from 'react-icons/fa'
import {FaGithub} from 'react-icons/fa'
import {FaTwitter} from 'react-icons/fa'
const HeaderSocials = () => {
  return (
    <div className='header__socials'>
        <a href='https://www.linkedin.com/in/kanav-singla-927946171/' target="_blank"><FaLinkedinIn/></a>
        <a href='https://github.com/kanavsinglaa' target="_blank"><FaGithub/></a>
        <a href='https://twitter.com/kanavWasTaken' target="_blank"><FaTwitter/></a>
    </div>
  )
}

export default HeaderSocials