import React, { useEffect } from 'react';
import * as d3 from 'd3';

const NeuralNetwork = () => {
    useEffect(() => {
        const svg = d3.select("#neural-network-svg");
        const width = +svg.attr("width");
        const height = +svg.attr("height");

        const neuronRadius = 10;
        const neuronSpacing = 40;
        const layerSpacing = 100;

        const layers = [
          Array(7).fill(null),
          Array(8).fill(null),
          Array(4).fill(null),
          Array(8).fill(null),
          Array(2).fill(null)
      ];

        layers.forEach((layer, i) => {
            layer.forEach((neuron, j) => {
                neuron = { x: 0, y: 0 };
                neuron.x = i * layerSpacing + 50;
                neuron.y = j * neuronSpacing + (height - (layer.length - 1) * neuronSpacing) / 2;
                layer[j] = neuron;
            });
        });

        const links = [];
        for (let i = 0; i < layers.length - 1; i++) {
            const currentLayer = layers[i];
            const nextLayer = layers[i + 1];

            currentLayer.forEach(neuronA => {
                nextLayer.forEach(neuronB => {
                    links.push({ source: neuronA, target: neuronB });
                });
            });
        }

        svg.selectAll("line")
            .data(links)
            .enter()
            .append("line")
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y)
            .attr("stroke", "#ffffff")
            .attr("stroke-width", 2)
            .attr("opacity", 0.6)
            .attr("class", d => `link link-${d.source.x}-${d.source.y}-${d.target.x}-${d.target.y}`);

        layers.forEach((layer, layerIndex) => {
            const layerGroup = svg.append("g");

            layerGroup.selectAll("circle")
                .data(layer)
                .enter()
                .append("circle")
                .attr("r", neuronRadius)
                .attr("fill", "#ffffff")
                .attr("cx", d => d.x)
                .attr("cy", d => d.y)
                .attr("opacity", 0.8)
                .attr("class", d => `neuron neuron-${d.x}-${d.y}`)
                .append("animate")
                .attr("attributeName", "r")
                .attr("values", "10;12;10")
                .attr("dur", "1s")
                .attr("repeatCount", "indefinite");
        });

        const colorScale = d3.scaleSequential(t => d3.interpolate(`#e6f7ff`, `#66FCF1`)(t));


        const animatePropagation = () => {
          let delay = 0;
          const animationDuration = 2000;  // Slowed down from 300ms to 500ms
      
          // First, activate the neurons in the initial layer
          setTimeout(() => {
              layers[0].forEach(neuron => {
                  const activation = Math.random();
                  svg.select(`.neuron-${neuron.x}-${neuron.y}`)
                      .attr("fill", colorScale(activation));
              });
          }, delay);
          delay += animationDuration;
      
          // Now, for the subsequent layers
          for (let layerIndex = 0; layerIndex < layers.length - 1; layerIndex++) {
              const currentLayer = layers[layerIndex];
              const nextLayer = layers[layerIndex + 1];
      
              // Activate links
              setTimeout(() => {
                  nextLayer.forEach(neuronB => {
                      let totalActivation = 0;
                      let count = 0;
                      currentLayer.forEach(neuronA => {
                          const activation = Math.random();
                          totalActivation += activation;
                          count++;
                          svg.select(`.link-${neuronA.x}-${neuronA.y}-${neuronB.x}-${neuronB.y}`)
                              .attr("stroke", colorScale(activation));
                      });
      
                      // Activate the neuron based on average incoming link activation
                      const averageActivation = totalActivation / count;
                      if (averageActivation > 0.5) {  // Threshold for neuron activation
                          svg.select(`.neuron-${neuronB.x}-${neuronB.y}`)
                              .attr("fill", colorScale(averageActivation));
                      }
                  });
              }, delay);
              delay += animationDuration;
          }
      
          // Reset after completing one cycle and start again
          setTimeout(() => {
              svg.selectAll(".neuron")
                  .attr("fill", "#ffffff");
              svg.selectAll(".link")
                  .attr("stroke", "#ffffff");
              animatePropagation();
          }, delay);
      };
      

        animatePropagation();

    }, []);

    return (
        <svg id="neural-network-svg" width="500" height="700"></svg>
    );
}

export default NeuralNetwork;
