import React from 'react'
import CV from '../../assets/resume.pdf'


const CTA = () => {
  return (
    <div className='cta'>
        <a href={CV} target="_blank" donwload className='btn'>Download CV</a>
        <a href="mailto:kanav.singla@mail.utoronto.ca" className='btn btn-primary'>Say hi</a>
    </div>
  )
}

export default CTA