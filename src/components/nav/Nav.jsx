import React from 'react'
import './nav.css'
import {FaHome} from 'react-icons/fa'
import {FaUserAstronaut} from 'react-icons/fa'
import {FaBook} from 'react-icons/fa'
import {FaCode} from 'react-icons/fa'
import {AiFillMessage} from 'react-icons/ai'
import { useState } from 'react'

const Nav = () => {
  const [activeNav,setActiveNav] = useState("#")
  return (
    <nav>
      <a href='#' onClick={()=> setActiveNav('#')} className={activeNav=== '#' ? 'active' : ''}><FaHome/></a>
      <a href='#about' onClick={()=> setActiveNav('#about')} className={activeNav=== '#about' ? 'active' : ''}><FaUserAstronaut/></a>
      <a href='#jobs' onClick={()=> setActiveNav('#jobs')} className={activeNav=== '#jobs' ? 'active' : ''}><FaBook/></a>
      <a href='#portfolio' onClick={()=> setActiveNav('#portfolio')} className={activeNav=== '#portfolio' ? 'active' : ''}><FaCode/></a>
      {/* <a href='#contact' onClick={()=> setActiveNav('#contact')} className={activeNav=== '#contact' ? 'active' : ''}><AiFillMessage/></a> */}
    </nav>
  )
}

export default Nav