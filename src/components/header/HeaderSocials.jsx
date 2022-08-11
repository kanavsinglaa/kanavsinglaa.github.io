import React from 'react'
import {FaLinkedinIn} from 'react-icons/fa'
import {FaGithub} from 'react-icons/fa'
import {FaTwitter} from 'react-icons/fa'
const HeaderSocials = () => {
  return (
    <div className='header__socials'>
        <a href='' target="_blank"><FaLinkedinIn/></a>
        <a href='' target="_blank"><FaGithub/></a>
        <a href='' target="_blank"><FaTwitter/></a>
    </div>
  )
}

export default HeaderSocials