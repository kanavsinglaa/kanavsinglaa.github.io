// FadeInSection.js
import React, { useEffect, useState, useRef } from 'react';
import './FadeInSection.css';

export default function FadeInSection(props) {
    const [isVisible, setVisible] = React.useState(false);
    const domRef = React.useRef();
  
    React.useEffect(() => {
      const currentRef = domRef.current;  // Capture the current value of the ref
  
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisible(entry.isIntersecting);
          }
        });
      });
  
      if (currentRef) {
        observer.observe(currentRef);
      }
  
      return () => {
        if (currentRef) {  // Use the captured value in the cleanup function
          observer.unobserve(currentRef);
        }
      };
    }, []);
  
    return (
      <div
        className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
        style={{ transitionDelay: `${props.delay}` }}
        ref={domRef}
      >
        {props.children}
      </div>
    );
  }
  