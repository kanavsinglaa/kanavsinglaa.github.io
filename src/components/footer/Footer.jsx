import React from 'react'
import './footer.css'
import { FaFacebookF } from "react-icons/fa"
import { FaTwitter } from "react-icons/fa"
import { FaInstagram } from "react-icons/fa"

const Footer = () => {
  return (
    <section id='footer'>
    <footer>
      <div className="footer_copyright">
      <div>Built and designed by Kanav Singla.</div>
      <div>All rights reserved. &copy;</div>
    </div>

    <div className='footer_socials'>
      <a href="https://twitter.com/kanavsinglaa"><FaTwitter /></a>
      <a href="https://www.instagram.com/kanavsinglaa/"><FaInstagram /></a>
      <a href="http://m.me/kanav.singla.532" target="_blank"><FaFacebookF /> </a>

    </div>

  </footer>
  </section>
  )
  }
export default Footer