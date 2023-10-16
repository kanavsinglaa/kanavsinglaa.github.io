import React, { useState, useEffect } from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";
import "./EulersIdentity.css"; 
let k = 1;
let j = 2;  // New parameter for varying the curve
let deltaK = 0.0065;  // Increased speed for the animation

const Sketch = p5 => {
  p5.setup = () => {
    p5.createCanvas(440, 440); 
    p5.noFill();
  };

  p5.draw = () => {
    p5.clear();
    p5.translate(p5.width / 2, p5.height / 2);

    p5.beginShape();
    for (let angle = 0; angle < 2 * p5.PI; angle += 0.01) {
      let r = 130 * p5.cos(k * angle) * p5.cos(j * angle);  // Increased radius multiplier
      let x = 1.5 * r * p5.cos(angle);  // Adjusted the x-axis scaling
      let y = r * p5.sin(angle);
      p5.stroke(255, 150);
      p5.strokeWeight(2);
      p5.vertex(x, y);
    }
    p5.endShape(p5.CLOSE);

    k += deltaK;
    if (k > 10 || k < 1) {
      deltaK = -deltaK;
    }
  };
};

const EnhancedEulersIdentity = () => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const adjustOpacity = () => {
      let newOpacity;
      if (deltaK > 0) {
        newOpacity = (k - 1) / 10;
      } else {
        newOpacity = (10 - k) / 10;
      }
      setOpacity(newOpacity);
    };
    const interval = setInterval(adjustOpacity, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="enhanced-eulers-identity">
      <ReactP5Wrapper sketch={Sketch} />
      <p className="eulers-equation" style={{ opacity: opacity }}>e<sup>iπ</sup> + 1 = 0</p>
    </div>
  );
};

export default EnhancedEulersIdentity;
