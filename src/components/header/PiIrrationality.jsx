import React, { useState } from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import "./EulersIdentity.css";
import FadeInSection from '../FadeInSection/FadeInSection';
const Sketch = p5 => {
    let theta = 0;  
    let innerRadius = 80;  // Adjusted for a more circular shape
    let outerRadius = 80;   // Adjusted for a more circular shape
    let tracedPoints = []; 
    p5.setup = () => {
        p5.createCanvas(440, 440);
    };

    p5.draw = () => {
        p5.translate(p5.width / 2, p5.height / 2);
        p5.clear();

        let x1 = innerRadius * Math.cos(theta);
        let y1 = innerRadius * Math.sin(theta);
        
        let x2 = x1 + outerRadius * Math.cos(Math.PI * theta);
        let y2 = y1 + outerRadius * Math.sin(Math.PI * theta);
        

        tracedPoints.push(p5.createVector(x2, y2));

        p5.stroke('rgba(255, 255, 255, 0.7)');
        p5.noFill();
        p5.beginShape();
        for (let point of tracedPoints) {
            p5.vertex(point.x, point.y);
        }
        p5.endShape();

        p5.stroke('#66FCF1');
        p5.line(0, 0, x1, y1);
        p5.line(x1, y1, x2, y2);

        theta += 0.05;  // Increased for faster visualization
    };
};

const PiIrrationality = () => {
    return (
        <div id="enhanced-eulers-identity">
            <ReactP5Wrapper sketch={Sketch} />
            <FadeInSection>
            <p className="eulers-equation">e<sup>iπ</sup> + 1 = 0</p>
            <p className="eulers-description">
                Bridging the realms of the real and imaginary, just as AI bridges the tangible and the abstract. A dance between logic and creativity, Euler's identity encapsulates my journey of melding the algorithmic precision of AI with the boundless canvas of human imagination and its real-world applications.
            </p>
            </FadeInSection>
        </div>
    );
};
export default PiIrrationality;
