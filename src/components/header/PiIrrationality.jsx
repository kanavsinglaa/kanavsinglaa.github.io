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
            In the realm of AI, my path parallels the precision of Euler's equation, where distinct concepts align in harmony. The animation stands as a testament to this, a portrayal of Pi's infinite complexity with the tools of the finite. It's a daily practice in balancing the exactness of current technologies with the aspirational stretch towards the infinite. As AI progresses, my commitment is to the alignment of groundbreaking solutions with our human context, enriching the intricacy of our collective experience.            
            </p>
            </FadeInSection>
        </div>
    );
};
export default PiIrrationality;
