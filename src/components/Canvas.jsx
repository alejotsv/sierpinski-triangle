import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';

const Canvas = (props) => {
  const [width, setWidth] = useState(props.width);
  const [height, setHeight] = useState(props.height);    
  let [dotNum, setDotNum] = useState(0);  

  // Variables for random dots
  let x;
  let y;

  const canvasRef = useRef(null);

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dotNum = 0;
    setDotNum(dotNum);
  }

  const drawTriangles = () => {            
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set base coordinates
    const firstDot = [300, 10];
    const secondDot = [50, 550];
    const thirdDot = [550, 550];

    // Draw dots on base coordinates
    drawDot(firstDot[0], firstDot[1]);
    drawDot(secondDot[0], secondDot[1]);
    drawDot(thirdDot[0], thirdDot[1]);

     // Establish triangle boundaries for the random dot
     ctx.beginPath();
     ctx.moveTo(firstDot[0], firstDot[1]);
     ctx.lineTo(secondDot[0], secondDot[1]);
     ctx.lineTo(thirdDot[0], thirdDot[1]);
     ctx.closePath();
    
    // Draw random dot inside the triangle
    x = Math.floor(Math.random() * 600); // Generate a random x coordinate
    y = Math.floor(Math.random() * 600); // Generate a random y coordinate

    let isDrawn = false;

    while(!isDrawn){
      if (ctx.isPointInPath(x, y)) { // Test if the point is inside the triangle
        console.log('x: ' + x + ' y: ' + y + ' is inside the triangle');
        drawDot(x, y);
        isDrawn = true;        
      } else {
        console.log('x: ' + x + ' y: ' + y + ' is outside the triangle');
        x = Math.floor(Math.random() * 600); // Generate a new random x coordinate
        y = Math.floor(Math.random() * 600); // Generate a new random y coordinate        
      }      
    }

    let original = randomOriginalDot(firstDot, secondDot, thirdDot);
    console.log(original[0]);
    console.log(original[1]);
    


    // const handleLoop = () => {
    //   let i = 0;
    //   while (i < 1000) {
    //     setTimeout(() => {
    //       dotNum++;
    //       setDotNum(dotNum);
    //       randomOriginalDot(firstDot,secondDot,thirdDot);
    //     }, i * 10);  // delay each iteration by 0.01 seconds
    //     i++;
    //   }
    // }

    // handleLoop();
    
  }

  const drawDot = (x, y) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  const randomOriginalDot = (first, second, third) => {
    let ran = Math.floor(Math.random() * 3) + 1;
    console.log(ran);
    switch(ran){
      case 1:
        return first;
        break;
      case 2:
        return second;
        break;
      case 3:
        return third;
        break;
    }
  }

  const stopDrawing = () => {
    console.log('To add button to stop drawing');
  }

  const getMidCoordinates = (pointOne, pointTwo) => {
    console.log('got it');
  }

  return(
    <div>
      <canvas ref={canvasRef} width={width} height={height} />
      <button onClick={drawTriangles}>Draw Triangles</button>
      {/* <button onClick={stopDrawing}>Stop</button>      */}
      <button onClick={clear}>Clear</button>
      <h2>Dots drawn: {dotNum}</h2>      
    </div>
  )
}

export default Canvas;