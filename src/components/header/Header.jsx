import React, { useEffect, useState } from 'react'; // Import useEffect and useState
import './header.css';
import CTA from './CTA';
import HeaderSocials from './HeaderSocials';
import Typist from 'react-typist';
import "react-typist/dist/Typist.css";
import EnhancedEulersIdentity from './EulersIdentity'; 
import PiIrrationality from './PiIrrationality'; 

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);  // State to control the fade-in effect

  // Use useEffect to trigger the fade-in effect when the component mounts
  useEffect(() => {
    // Add a delay before fading in (adjust the delay duration if needed)
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    // Cleanup the timeout to prevent memory leaks
    return () => clearTimeout(timeout);
  }, []);

  return (
    <header>
      <div className={`container header__container${isVisible ? ' fade-in' : ''}`}>
        <Typist avgTypingDelay={250}>
          <span className="intro-title">
            {"hi, "}
            <span className="intro-name">{"kanav"}</span>
            {" here."}
          </span>
        </Typist>
        <h2 className="text-light">Bridging AI and Creativity | Building Innovative Products</h2>
        <p className="intro-description">
        I'm an AI engineer and innovator based in Toronto. Deeply engaged in bridging research with real-world development, I'm passionate about designing AI products and pushing the boundaries of what's achievable.
        </p>
        <CTA />
        <HeaderSocials/>
        <PiIrrationality/>
        <a href='#footer' className='scroll__down'> scroll down </a>
      </div>
    </header>
  );
}

export default Header;