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
    <div className='permalinks'>
      <li><a href='#'>/home</a></li>
      <li><a href='#about'>/about</a></li>
      <li><a href='#jobs'>/experience</a></li>
      <li><a href='#portfolio'>/portfolio</a></li>
    </div>

    <div className='footer_socials'>
      <a href="http://m.me/kanav.singla.532" target="_blank"><FaFacebookF /> </a>
      <a href=""><FaTwitter /></a>
      <a href=""><FaInstagram /></a>
    </div>

  </footer>
  </section>
  )
  }
export default Footer